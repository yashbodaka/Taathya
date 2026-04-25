import json
from nlp_hunter import NLPHunter
import google.generativeai as genai # Assuming you use the google-generativeai SDK
import os

# --- CONFIGURE YOUR LLM HERE ---
genai.configure(api_key=os.environ.get("GEMINI_API_KEY")) # Or hardcode your key for testing
model = genai.GenerativeModel('gemini-2.5-flash')

HYBRID_SYSTEM_PROMPT = """
ROLE:
You are an Enterprise Master Data Management (MDM) Architect. Your job is to build a mathematically strict JSON Knowledge Graph from the provided text.

THE "CHEAT SHEET" (GLiNER EXTRACTIONS):
You will be provided with a `<gliner_extractions>` JSON payload. This is a pre-scanned list of entities found in the text by an NLP model. 
- You MUST ensure every Person, Company, Product, and Quantitative Number/Percentage listed is mathematically normalized and attached to your graph.
- FILTERING RULE: The NLP model is a "dumb" highlighter. It may have categorized "smartphone users" as a Number, or extracted fluff like "higher quality products". You must use your own logical reasoning to drop the fluff and properly categorize the valid entities using our strict SCHEMA ADHERENCE rules.

THE MATERIALITY THRESHOLDS (STRICT POSITIVE INCLUSION):
1. Checkbook Test (Product): Is it a branded, customer-facing offering?
2. Revenue Test (Business_Segment): Is it a distinct revenue category?
3. The Metric Triad: Every number requires a `MetricObservation` node connected to a `MetricConcept`.
4. Mathematical Formatting: Convert textual numbers ("1,040-1,080 million") into pure floats/integers, or split them into min/max attributes if it is a range.

OUTPUT FORMAT (STRICT JSON ONLY):
{
  "bouncer_checks": [
    // Step 1: Evaluate the borderline nouns from the GLiNER list (Keep/Drop)
  ],
  "nodes": [
    // Step 2: Serialize entities, periods, and observations here. 
  ],
  "edges": [
    // Step 3: Connect the nodes strictly (e.g. Person -> HAS_ROLE -> Job -> AT_COMPANY -> Company).
  ]
}
"""

def run_hybrid_extraction(massive_text: str):
    print("1. Initiating GLiNER Hunter...")
    hunter = NLPHunter()
    gliner_results = hunter.hunt_entities(massive_text)
    
    print("\n2. GLiNER Extraction Complete. Passing Cheat Sheet to LLM Architect...")
    
    user_prompt = f"""
    Build the JSON Knowledge Graph.
    
    <gliner_extractions>
    {json.dumps(gliner_results, indent=2)}
    </gliner_extractions>
    
    <raw_text>
    {massive_text}
    </raw_text>
    """
    
    print("3. LLM Processing (Applying Bouncer Rules & Schema)...")
    
    # Call Gemini (forcing JSON response)
    response = model.generate_content(
        contents=[HYBRID_SYSTEM_PROMPT, user_prompt],
        generation_config={"response_mime_type": "application/json"}
    )
    
    print("\n--- FINAL HYBRID GRAPH OUTPUT ---")
    print(response.text)
    return response.text

if __name__ == "__main__":
    # Paste your massive Swiggy/Macro text here
    test_text = """
    [PASTE YOUR ENTIRE 8-CHUNK TEXT HERE]
    """
    run_hybrid_extraction(test_text)