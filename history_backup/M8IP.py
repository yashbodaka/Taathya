import json
from nlp_hunter import NLPHunter
import google.generativeai as genai # Assuming you use the google-generativeai SDK
import os

# --- CONFIGURE YOUR LLM HERE ---
genai.configure(api_key=os.environ.get("GEMINI_API_KEY")) # Or hardcode your key for testing
model = genai.GenerativeModel('gemini-3-flash-preview')

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
   Chunk id: 1, page: 1
The presentation highlights the highest ever quarterly and half yearly performance across metrics for Zaggle, with the tagline “Spends Simplified.” For Q2 FY26, Revenue from operations is ₹4,309.8 Mn, representing a YoY growth of +42.4%; Adjusted EBITDA (before ESOP) is ₹437.3 Mn, with YoY growth of +48.1%; PAT is ₹332.4 Mn, up YoY +79.1%; and Cash PAT is ₹404.4 Mn, up YoY +69.8%. For H1 FY26, Revenue from operations is ₹7,624.7 Mn, up YoY +37.4%; Adjusted EBITDA (before ESOP) is ₹764.6 Mn, up YoY +38.8%; PAT is ₹591.2 Mn, up YoY +67.6%; and Cash PAT is ₹751.1 Mn, up YoY +63.9%. The page number “5” is visible at the bottom right.

Chunk id: 2, page: 2
The key operational performance indicators for Zaggle show that the total customers catered to increased from 3,213 in Q2FY25 to 3,674 in Q2FY26, representing a 14.3% growth. The aggregate users on the platform rose from 3.03 million in Q2FY25 to 3.51 million in Q2FY26, reflecting a 15.8% increase. Under the revenue mix measured in ₹ million, software fees grew from ₹85 million in Q2FY25 to ₹105 million in Q2FY26 (+23.8%) and from ₹170 million in H1FY25 to ₹206 million in H1FY26 (+21.8%). Program fees increased from ₹1,261 million in Q2FY25 to ₹1,739 million in Q2FY26 (+37.9%) and from ₹2,531 million in H1FY25 to ₹3,194 million in H1FY26 (+26.2%). Propel platform revenue rose from ₹1,679 million in Q2FY25 to ₹2,466 million in Q2FY26 (+46.8%) and from ₹2,848 million in H1FY25 to ₹4,225 million in H1FY26 (+48.4%).

Chunk id: 3, page 3
The standalone profit and loss statement for the period ending Q2FY26, presented in ₹ Million unless otherwise stated, reports revenue from operations of ₹4,309.8 million, representing a 42.4% year-over-year (YoY) growth from ₹3,025.6 million in Q2FY25 and a 30.0% quarter-over-quarter (QoQ) increase from ₹3,314.9 million in Q1FY26; for the first half of FY26 (H1FY26), revenue from operations totaled ₹7,624.7 million, up 37.4% YoY from ₹5,547.6 million in H1FY25, with full-year FY25 revenue at ₹13,026.5 million. The cost of point redemption/gift cards amounted to ₹2,352.7 million in Q2FY26 (₹1,617.5 million in Q2FY25), while consumption of cards was ₹5.1 million (₹1.8 million in Q2FY25). Gross profit for Q2FY26 was ₹1,952.0 million (38.8% YoY growth from ₹1,406.3 million), with a gross profit margin of 45.3% (down from 46.5% in Q2FY25); Q1FY26 gross profit was ₹1,637.1 million (19.2% QoQ growth) with a 49.4% margin, while H1FY26 gross profit was ₹3,589.1 million (27.1% YoY growth) with a 47.1% margin, compared to FY25 gross profit of ₹6,228.5 million at a 47.8% margin. Employee benefits expense in Q2FY26 was ₹158.8 million (₹150.9 million in Q2FY25), incentive and cash back expenses were ₹1,158.5 million (₹789.7 million in Q2FY25, 21.2% QoQ growth from ₹955.6 million in Q1FY26), and other expenses were ₹197.3 million (₹170.4 million in Q2FY25). Adjusted EBITDA for Q2FY26 was ₹437.3 million (48.1% YoY growth from ₹295.2 million), with an adjusted EBITDA margin of 10.1% (up from 9.8% in Q2FY25); Q1FY26 adjusted EBITDA was ₹327.2 million (33.6% QoQ growth) with a 9.9% margin, while H1FY26 adjusted EBITDA was ₹764.6 million (38.8% YoY growth) with a 10.0% margin, compared to FY25 adjusted EBITDA of ₹1,244.9 million at a 9.6% margin. ESOP cost in Q2FY26 was -₹2.2 million (₹28.2 million in Q2FY25), resulting in reported EBITDA of ₹439.5 million (64.6% YoY growth from ₹267.1 million) with a reported EBITDA margin of 10.2% (up from 8.8% in Q2FY25); Q1FY26 reported EBITDA was ₹309.0 million (42.2% QoQ growth) with a 9.3% margin, while H1FY26 reported EBITDA was ₹748.5 million (52.3% YoY growth) with a 9.8% margin, compared to FY25 reported EBITDA of ₹1,152.3 million at an 8.8% margin. Other income in Q2FY26 was ₹93.0 million (₹37.4 million in Q2FY25), depreciation and amortization was ₹74.2 million (₹24.4 million in Q2FY25), leading to EBIT of ₹458.3 million (63.7% YoY growth from ₹280.1 million) with an EBIT margin of 10.6% (up from 9.3% in Q2FY25); Q1FY26 EBIT was ₹356.3 million (28.6% QoQ growth) with a 10.7% margin, while H1FY26 EBIT was ₹814.7 million (54.2% YoY growth) with a 21.4% margin, compared to FY25 EBIT of ₹1,250.5 million at a 9.6% margin. Finance cost in Q2FY26 was ₹13.7 million (₹22.1 million in Q2FY25), resulting in profit before tax of ₹444.6 million (₹257.9 million in Q2FY25), tax expense of ₹112.2 million (₹72.3 million in Q2FY25), and profit after tax (PAT) of ₹332.4 million (79.1% YoY growth from ₹185.6 million) with a PAT margin of 7.7% (up from 6.1% in Q2FY25); Q1FY26 PAT was ₹258.8 million (28.5% QoQ growth) with a 7.8% margin, while H1FY26 PAT was ₹591.2 million (67.6% YoY growth) with a 7.8% margin, compared to FY25 PAT of ₹874.8 million at a 6.7% margin. Cash PAT (PAT + DA + ESOP) for Q2FY26 was ₹404.4 million (69.8% YoY growth from ₹238.2 million) with a cash PAT margin of 9.4% (up from 7.9% in Q2FY25); Q1FY26 cash PAT was ₹346.7 million (16.6% QoQ growth) with a 10.5% margin, while H1FY26 cash PAT was ₹751.1 million (63.9% YoY growth) with a 9.9% margin, compared to FY25 cash PAT of ₹1,114.3 million at an 8.6% margin. Basic EPS for Q2FY26 was ₹2.48 (₹1.51 in Q2FY25), and diluted EPS was ₹2.47 (₹1.50 in Q2FY25); Q1FY26 basic EPS was ₹1.93 and diluted EPS was ₹1.92, while H1FY26 basic EPS was ₹4.40 and diluted EPS was ₹4.39, compared to FY25 basic EPS of ₹6.96 and diluted EPS of ₹6.93. Key highlights note the highest ever half-yearly and quarterly performance across revenue streams including software fees, program fees, and Propel platform revenue; YoY growth in the topline is attributed to addition in new clients and number of users, and cross-sell initiatives on the higher side; other expenses increased primarily due to higher sales and marketing expenses in line with growing business; increase in depreciation & amortisation is driven by capitalisation of new technology and product developments, reflecting continued investment in innovation; and cash PAT crossed the mark of ₹400 million in Q2FY26.

Chunk id: 4, page: 4
Zaggle has established several strategic alliances with financial institutions, each defined by specific contract briefs and durations. In partnership with AU Small Finance Bank, Zaggle will launch a co-branded retail credit card powered by a personalized recommendation engine and TPAP integration; additionally, Zaggle has partnered with AU Small Finance Bank on corporate credit cards to be provided to Zaggle’s corporate customer base, and the two entities shall also offer a co-branded prepaid card solution powered by the Zatix platform to Zaggle’s corporate base, with this alliance having a duration of 3 years. IDFC First Bank Limited shall offer Zaggle Solutions to its corporate customers base under a perpetual agreement, while Zaggle shall offer IDFC First Bank’s Forex Solutions to its corporate customers for a duration of 3 years. Zaggle shall offer its software solutions along with prepaid payment instruments to corporate customers of Standard Chartered Bank for a duration of 5 years. Furthermore, Zaggle has partnered with Mastercard to launch and promote co-branded domestic prepaid cards on the Mastercard network, with this partnership also lasting 5 years.

    """
    run_hybrid_extraction(test_text)