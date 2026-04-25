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
    Chunk id: 5, Page: 1
Swiggy is a new-age, consumer-first technology company offering users an easy-to-use unified platform, structured as a consumer convenience platform. This platform encompasses four primary service categories: Food delivery, Dining out and Events, Grocery and Household items delivery, and Other hyperlocal services. Supporting these services are four partner categories: Restaurant partners, Merchant partners, Brand partners, and Delivery partners. Underpinning the entire ecosystem are four foundational capabilities: Technology, Analytics, Fulfilment, and Membership, with the Membership component branded as “Swiggy one.” The source of this information is the Swiggy Limited IPO Prospectus.

Chunk id: 6, Page 2
Swiggy positions itself as a pioneer in high-frequency hyperlocal commerce categories, driven by an innovation-led culture that is described as an integral part of its DNA, encouraging constant ideation, experimentation, and iteration. The company emphasizes a convenience-first approach, faster delivery times, product quality, assortments, and personalized recommendations. Its primary app and underlying reusable tech stack enable quick and low-cost innovations. Swiggy was a pioneer in Food Delivery in 2014 and in Quick Commerce in 2020. It has a successful track record of scaling up businesses, exemplified by Instamart, which scaled to 124 cities as of 31 March 2025 from 2 cities in less than 5 years of launch. Strategic acquisitions, such as Dineout, have expanded its platform capabilities. The company offers a membership programme providing benefits across its offerings, including 10-minute food delivery, food delivery from restaurants, quick delivery of groceries and household items, restaurant reservations and payments, events and experiences, a co-branded credit card, and Quick Bites.

Chunk id: 7, Page 3
The urban convenience platform was built by adding adjacent services over a decade, beginning with the incorporation of the company in 2013 under the name Bengaluru, followed by the launch of the Food Delivery business in 2014. In 2015, the company completed its first major fundraise. The platform expanded in 2019 with the expansion of the food delivery business to cover over 500 cities. In 2020, Swiggy Instamart and Swiggy Genie were launched. The year 2021 saw the launch of the membership program, Swiggy One. In 2022, the company acquired and integrated Dineout, expanded Swiggy Instamart to cover 25 cities with over 400 dark stores and over 8,400 SKUs, and launched Swiggy Minis. In 2023, the company launched the Swiggy-HDFC Bank co-branded credit card, acquired a 100% stake in Lynk, and launched Swiggy Mall, now integrated with Instamart. In 2024, the Swiggy One membership base crossed 5.7 million members, the company completed its public listing, launched Bolt for 10-minute food delivery, and launched Swiggy Scenes for events and experiences. In 2025, the platform surpassed 120 million transacted users and launched SNACC and Pyng. The source of this information is the Swiggy Limited IPO Prospectus, Annual Report FY 2024-25.

Chunk id: 8, Page 4
The presentation highlights a strong leadership team composed of dynamic entrepreneurs and professionals who collectively possess 52 years of total Swiggy experience. The team includes Sriharsha Majety, Managing Director & Group CEO of Swiggy Limited, with prior experience at Swiggy Limited; Lakshmi Nandan Reddy Obul, Whole-time Director – Head of Innovation at Intellectual Capital Advisory Services Private Limited (Intellecap); Rohit Kapoor, CEO–Food Marketplace, with prior experience at Oravel Stays Limited, Max Healthcare Institute Ltd., and Mckinsey & Company Inc.; Phani Kishan Addepalli, Chief Growth Officer, with prior experience at Boston Consulting Group (India) Private Limited; Amitesh Jha, CEO-Instamart, with prior experience at Flipkart Private Limited; Girish Menon, Chief Human Resources Officer, with prior experience at Flipkart Internet Private Limited, HSBC, and Fullerton India Credit Company Limited; Rahul Bothra, Chief Financial Officer, with prior experience at Wipro Limited, Britannia Industries Limited, and Olam International Limited; and Madhusudhan Rao Subbarao, Chief Technology Officer, with prior experience at Boomerang Commerce India Private Limited and Amazon.

Chunk id: 9, Page 5
The board is backed by a reputed Board with high governance and sustainability standards, comprising Independent Directors and Non-Executive Directors. The Independent Directors include Anand Kripalu, who serves as Chairperson and is associated with EPL Limited, United Breweries Limited, and PGP Glass Private Limited; Shailesh Vishnubhai Haribhakti, who is the Audit Chair and affiliated with Blue Star Limited, L&T Finance Holdings Limited, Raymond Limited, and Ambuja Cements Limited; Suparna Mitra, linked to Titan Engineering and Automation Limited; and Faraz Khalid, associated with Noon. The Non-Executive Directors are Roger Clark Rabalais, representing Prosus, and Ashutosh Sharma, representing Prosus Ventures India. The board features a strong corporate governance framework, independent directors with decades of operational and fiduciary experience across listed companies, and a deep background in consumer and technology businesses. Additionally, Sriharsha Majety and Lakshmi Nandan Reddy Obul are present on the board as Executive Directors. Faraz Khalid was appointed as an Independent Director on 25-Jul-25, subject to shareholder approval. Sumer Juneja (Soft Bank) and Anand Daniel (Accel Partners) resigned from Directorship, effective 25-Jul-2025.

Chunk id: 10, Page 6
The content displayed is from Page 6 and is titled “Industry Overview.” The Swiggy logo, consisting of a white square icon with a stylized lightning bolt and location pin design alongside the word “Swiggy” in white text, is positioned in the upper left corner. The background is divided vertically into two color blocks: the left side is solid orange, and the right side is solid yellow. On the orange background, the text “Industry Overview” appears in large white font. Floating across the orange and yellow background are stylized 3D illustrations of various food items: a slice of pepperoni pizza, a chocolate-frosted donut with sprinkles, a red-and-white striped container of french fries, a bowl of pink ice cream with yellow toppings, a swirl of white whipped cream, a cup of dark soda with a foamy top, a white bowl containing mashed potatoes, beans, and a chicken drumstick, a hamburger with sesame seed bun, a brown paper bag, a green pickle, and a yellow ravioli-like item. All food items are rendered in a cartoonish, rounded 3D style and are arranged as if suspended in mid-air across the two background colors. No tables or numerical data are present on this page.

Chunk id: 11, Page 7
India is transforming into a consumption-led economy, characterized by four key attributes: it is sizeable, fast-growing, has increasing addressable households, and is urbanized. As a sizeable economy, India is projected to become the 3rd largest economy by calendar year 2028. As a fast-growing economy, it is expected to grow at approximately 6% annually between calendar years 2024 and 2028, making it the fastest-growing major economy during that period. In terms of increasing addressable households, there are approximately 213 million nuclear households as of 2024. Regarding urbanization, cities contributed 67% of GDP in 2024 and are projected to contribute 80% of GDP by 2050. This transformation is underpinned by increasing affluence, heightened demand for higher quality products and services, and enhanced purchasing experiences. The source of this information is the Redseer report titled “Indian Hyperlocal Commerce Opportunity (Oct-24),” published by Redseer Research and Analysis. Footnote 1 clarifies that the 6% growth rate is annual between calendar years 2024 and 2028, and footnote 2 indicates that the 213 million nuclear households figure is as of 2024.

Chunk id: 12, Page 8
The content illustrates the growth trajectory of the digitally-native consumer base in India and China, with data presented for the years 2024 and 2028P (projected) for India, and 2024 for China, all expressed as percentages of the total population. For India, in 2024, the total population with access to the internet is 810–840 million, representing approximately 58% of the total population; this is projected to grow to 1,040–1,080 million (70–73%) by 2028P, with a Compound Annual Growth Rate (CAGR) of 6–7% for the 2024–28P period. Smartphone users in India are 680–690 million (~49%) in 2024, projected to reach 950–990 million (64–67%) by 2028P, with a CAGR of 8–10%. Online commerce users in India, defined as those who transact online on digital platforms, are 230–250 million (~31%) in 2024, projected to grow to 320–350 million (~21–23%) by 2028P, also with a CAGR of 8–10%. The growth from 2024 to 2028P is quantified as +240 million for internet access, +300 million for smartphone users, and +110 million for online commerce users. For China in 2024, the total population with access to the internet is 1,149 million or more (~81%), smartphone users are 1,121 million or more (~79%), and online commerce users are 950 million or more (~67%). The source of this data is cited as the Redseer report - Indian Hyperlocal Commerce Opportunity (Oct-24), Redseer Research and Analysis, and the Swiggy Limited IPO Prospectus.

    """
    run_hybrid_extraction(test_text)