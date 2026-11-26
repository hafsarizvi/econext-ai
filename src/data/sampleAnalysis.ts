
export type Opportunity = {
  name: string;
  description: string;
  suitability: string;
  requirements: string[];
  challenges: string[];
  firstSteps: string[];
  verificationQuestions: string[];
  evidenceStatus: string;
  startupComplexity?: string;
  resourceFit?: string;
  budgetConsiderations?: string;
  comparisonReason?: string;
};

export type Analysis = {
  overallAssessment: string;
  opportunities: Opportunity[];
  recommendedFirstStep: string;
};

export type Source = {
  fact: string;
  source: string;
  url: string;
};

export const SAMPLE_PROFILE = {
  resource: "Coconut husks",
  district: "Gampaha",
  quantity: "500 kg per month",
  budget: "LKR 25,000–100,000",
  experience: "Beginner",
};

export const RICE_SAMPLE_PROFILE = {
  resource: "Rice husks",
  district: "Gampaha",
  quantity: "500 kg per month",
  budget: "LKR 25,000–100,000",
  experience: "Beginner",
};

export const SAMPLE_ANALYSIS: Analysis = {
  overallAssessment:
    "This is a prepared demonstration for 500 kg of coconut husks per month in Gampaha, with a starting budget of LKR 25,000–100,000. A supply-based approach may be a more manageable starting point than immediately investing in processing machinery. However, feasibility depends on consistent supply, material condition, transport, buyer requirements and local demand. This example is illustrative. It is not a personalised assessment or a verified feasibility study.",

  opportunities: [
    {
      name: "Coconut husk collection and supply",
      description:
        "Collect, sort and supply coconut husks to existing coir processors or other potential users. This pathway explores whether value can be created through organised sourcing and supply before investing in processing equipment.",
      suitability:
        "Potentially suitable as an exploratory starting point for someone with limited capital, provided a consistent supply and interested buyers can be identified.",
      requirements: [
        "Reliable access to coconut husks",
        "A suitable collection and temporary storage area",
        "Transport or collection arrangements",
        "Potential buyer contacts",
        "Basic weighing and record-keeping",
      ],
      challenges: [
        "Transport costs may affect feasibility",
        "Storage space and moisture management",
        "Finding buyers who accept the available material",
        "Competition from existing suppliers",
      ],
      firstSteps: [
        "Identify nearby coconut processing businesses.",
        "Contact potential buyers about their material requirements.",
        "Measure the quantity of husks available each week.",
        "Calculate collection, handling and transport costs.",
        "Conduct a small trial supply before expanding.",
      ],
      verificationQuestions: [
        "Are there coconut processors within a practical transport distance?",
        "What quantity and quality of husks do potential buyers accept?",
        "Would buyers collect the material or require delivery?",
        "What price, if any, would buyers offer?",
      ],
      evidenceStatus:
        "Coconut husks are an established raw material for coir-related processing. The commercial feasibility of collecting and supplying husks in this location remains unverified.",
      startupComplexity: "Low",
      resourceFit: "Strong",
      budgetConsiderations:
        "A small trial may avoid major machinery costs, but transport, labour, storage and handling costs must be calculated.",
      comparisonReason:
        "Explores a supply-based approach that may require less processing infrastructure than manufacturing a finished product.",
    },
    {
      name: "Coco peat production",
      description:
        "Explore processing coconut husks into coco peat, a material used in growing media and horticultural applications. Processing typically involves fibre separation and further preparation of the material.",
      suitability:
        "Potentially relevant if the resource is available consistently and the user can access suitable processing equipment, technical guidance and prospective customers.",
      requirements: [
        "Coconut husks",
        "Suitable fibre separation and processing equipment",
        "Drying and preparation facilities",
        "Quality control",
        "Packaging and storage",
      ],
      challenges: [
        "Equipment and processing costs",
        "Product consistency",
        "Drying and storage requirements",
        "Competition and buyer specifications",
      ],
      firstSteps: [
        "Visit an existing coir or coco peat producer.",
        "Learn about the processing stages and equipment required.",
        "Investigate whether equipment can be rented or processing outsourced.",
        "Request product specifications from potential buyers.",
        "Prepare a basic cost estimate for a small trial.",
      ],
      verificationQuestions: [
        "Is suitable processing equipment accessible?",
        "What quality specifications do potential buyers require?",
        "What are the costs of processing and packaging?",
        "Can the available quantity support a consistent product?",
      ],
      evidenceStatus:
        "Coconut husks are used in coir processing and coco peat production. The required processing setup and local commercial feasibility need further investigation.",
      startupComplexity: "Medium",
      resourceFit: "Strong",
      budgetConsiderations:
        "The selected sample budget may be insufficient for independent processing equipment. Explore shared facilities, existing processors or small-scale trials.",
      comparisonReason:
        "Offers a processed product pathway but involves more technical requirements than supplying raw material.",
    },
    {
      name: "Coir-based products",
      description:
        "Investigate the production of simple coir-based products using coconut fibre, such as fibre-based growing products or other suitable products selected after researching customer requirements.",
      suitability:
        "May be worth exploring for someone interested in product development, provided suitable fibre can be sourced and production methods are accessible.",
      requirements: [
        "Prepared coir fibre",
        "Appropriate tools or moulds depending on product",
        "Product design and quality testing",
        "Packaging",
        "Potential customer feedback",
      ],
      challenges: [
        "Product development and consistency",
        "Finding a product customers actually want",
        "Production time and labour",
        "Packaging and distribution",
      ],
      firstSteps: [
        "Research existing coir products.",
        "Choose one simple product to investigate.",
        "Speak with potential customers about their requirements.",
        "Create a small prototype using accessible materials.",
        "Collect feedback before producing larger quantities.",
      ],
      verificationQuestions: [
        "Which coir products have identifiable potential customers?",
        "Can the required fibre and tools be accessed locally?",
        "What would customers expect in terms of quality and price?",
        "What are the estimated production costs per item?",
      ],
      evidenceStatus:
        "Coir is used in a range of fibre-based products. Specific product demand, production costs and customer acceptance have not been verified.",
      startupComplexity: "Medium",
      resourceFit: "Moderate",
      budgetConsiderations:
        "A prototype-led approach may help limit initial spending. Actual tooling, labour and material costs must be established.",
      comparisonReason:
        "Explores the possibility of a value-added product rather than selling raw material, but requires customer and product validation.",
    },
  ],

  recommendedFirstStep:
    "Start by contacting three existing coconut processors or potential buyers in your area. Ask what type of husks they accept, their minimum quantities, collection arrangements and whether they would consider a small trial. Record their answers, measure the material available and compare transport costs before committing your budget.",
};

export const RICE_SAMPLE_ANALYSIS: Analysis = {
  overallAssessment:
    "This is a prepared, research-informed demonstration exploring possible uses for 500 kg of rice husks per month in Gampaha. A collection and supply approach may be a practical first area to investigate before considering processing equipment. Other possible pathways include biomass fuel supply and controlled biochar production. However, transport, storage, moisture, processing requirements, safety and buyer specifications must be investigated. This example is illustrative and is not a personalised assessment or verified feasibility study.",

  opportunities: [
    {
      name: "Raw rice husk collection and supply",
      description:
        "Collect, sort, store and supply rice husks to potential users or processors. This approach explores whether an organised supply arrangement is possible without undertaking advanced manufacturing.",
      suitability:
        "A relatively accessible pathway to investigate before investing in processing machinery, provided a reliable rice mill supply and interested buyers can be identified.",
      requirements: [
        "Reliable access to rice mills or husk suppliers",
        "Suitable dry storage space",
        "Collection and handling arrangements",
        "Transport access",
        "Identification of potential buyers",
      ],
      challenges: [
        "Transport costs may make small quantities uneconomical",
        "Storage space and moisture management",
        "Dust and material contamination",
        "Seasonal supply fluctuations",
        "Buyer demand has not been confirmed",
      ],
      firstSteps: [
        "Identify rice mills within a practical transport distance.",
        "Ask mills about available quantities and collection arrangements.",
        "Inspect the husks for moisture and contamination.",
        "Contact potential users and ask about their material specifications.",
        "Calculate handling and transport costs before arranging a trial.",
      ],
      verificationQuestions: [
        "How much rice husk can a nearby mill supply regularly?",
        "Would the mill allow direct collection?",
        "Are potential buyers located within a practical transport distance?",
        "What condition and quality do buyers require?",
        "Would buyers collect the material themselves?",
      ],
      evidenceStatus:
        "Rice husks are a by-product of paddy milling. The availability of local suppliers, buyer interest and commercial feasibility for this example have not been verified.",
      startupComplexity: "Low",
      resourceFit: "Strong",
      budgetConsiderations:
        "A small supply trial may avoid machinery costs. Transport, handling, storage and any packaging expenses still need to be calculated.",
      comparisonReason:
        "Explores direct material supply before investing in more complex fuel or processing operations.",
    },
    {
      name: "Rice husk biomass fuel supply",
      description:
        "Investigate supplying rice husks as biomass fuel to suitable industrial users. This pathway depends on the buyer having equipment designed or adapted to use rice husks and accepting the material's fuel characteristics.",
      suitability:
        "Potentially relevant where nearby industries use compatible biomass systems and can confirm their fuel requirements.",
      requirements: [
        "Consistent access to rice husks",
        "Dry storage and moisture management",
        "Handling and transport arrangements",
        "Potential industrial users",
        "Knowledge of buyer fuel specifications",
      ],
      challenges: [
        "Not all boilers or fuel systems can use rice husks",
        "Moisture and fuel quality affect suitability",
        "Transport and handling costs",
        "Competition with other biomass fuels",
        "Buyer demand must be confirmed",
      ],
      firstSteps: [
        "Identify nearby industries that use biomass boilers.",
        "Ask whether their equipment can accept rice husks.",
        "Request their moisture and fuel quality specifications.",
        "Find out whether they accept loose husks or require processed fuel.",
        "Compare supply and transport costs with the buyer's requirements.",
      ],
      verificationQuestions: [
        "Are there nearby industries using biomass fuel?",
        "Can their equipment safely use rice husks?",
        "What moisture and quality specifications apply?",
        "Would the buyer purchase loose husks or require a processed form?",
        "Can the supply and transport arrangements be sustained?",
      ],
      evidenceStatus:
        "A 2025 Sri Lankan research study investigated rice husk biomass briquettes for boiler use. This supports research into the pathway but does not establish buyer demand or commercial feasibility for this example.",
      startupComplexity: "Medium",
      resourceFit: "Moderate",
      budgetConsiderations:
        "Supplying raw material may avoid briquetting machinery, but storage and transport costs remain. Briquette production would require a separate technical and financial assessment.",
      comparisonReason:
        "Explores a potential energy-related use, but depends on compatibility with a confirmed industrial buyer's equipment.",
    },
    {
      name: "Rice husk biochar production",
      description:
        "Investigate the controlled thermal conversion of rice husks into biochar for possible agricultural trials. The processing method, product properties and intended application require technical evaluation.",
      suitability:
        "A research-led pathway that may be worth exploring with technical guidance or an institutional partner. It should not be treated as a simple beginner production activity.",
      requirements: [
        "Appropriate controlled processing equipment",
        "A suitable and safe operating area",
        "Technical knowledge or experienced support",
        "Cooling and safe handling arrangements",
        "Testing for the intended application",
        "Potential research or agricultural partners",
      ],
      challenges: [
        "Equipment and setup costs",
        "Heat, fire, smoke and worker safety risks",
        "Product quality may vary with processing conditions",
        "Testing is needed for the intended application",
        "Buyer acceptance and agricultural performance are not guaranteed",
      ],
      firstSteps: [
        "Contact a university or technical institution with relevant research experience.",
        "Study controlled rice husk biochar production methods.",
        "Identify suitable equipment and safety requirements.",
        "Discuss testing requirements for the intended application.",
        "Explore a supervised research trial before considering production.",
      ],
      verificationQuestions: [
        "Is appropriate controlled processing equipment accessible?",
        "Who can provide technical guidance?",
        "What safety measures and local requirements apply?",
        "Has the material been tested for the intended agricultural use?",
        "Are farmers or research partners willing to evaluate a trial?",
      ],
      evidenceStatus:
        "A Sri Lankan study investigated paddy husk biochar as a soil amendment using a pot experiment. This is research evidence for investigation, not proof of commercial viability or performance in every soil type.",
      startupComplexity: "High",
      resourceFit: "Moderate",
      budgetConsiderations:
        "The sample budget should not be assumed sufficient for safe independent production. Investigate institutional partnerships and existing controlled facilities first.",
      comparisonReason:
        "Offers a higher-complexity processing pathway that requires more technical support and validation than raw material supply.",
    },
  ],

  recommendedFirstStep:
    "Start by contacting three rice mills in or near the selected area. Ask how much rice husk they produce, whether it is available regularly, its condition and whether collection is possible. Then contact potential industrial users to establish whether they accept rice husks and what specifications they require. Record transport and handling costs before considering any processing investment.",
};

export const SAMPLE_SOURCES: Source[] = [
  {
    fact:
      "Coconut husks are used to extract coir fibre. Fully ripened coconuts generally yield brown coir, while less mature coconut husks yield softer white coir.",
    source:
      "Sri Lanka Export Development Board, Coconut and Coconut-based Products",
    url: "https://www.srilankabusiness.com/coconut/sri-lankan-coconut-and-coconut-based-products.html",
  },
  {
    fact:
      "Sri Lankan coir fibre is used to manufacture products such as brushes, brooms, mats, ropes, twine and geotextiles.",
    source:
      "Sri Lanka Export Development Board, Coconut Fibre-based Products",
    url: "https://www.srilankabusiness.com/coconut/coconut-fibre-products.html",
  },
  {
    fact:
      "Coco peat, also known as coir pith, is the spongy material separated from coconut husks during coir fibre extraction. It is used as a raw material for coco peat-based products.",
    source:
      "Sri Lanka Export Development Board, Coco Peat-based Products",
    url: "https://www.srilankabusiness.com/coconut/coco-peat-products.html",
  },
  {
    fact:
      "Research at the University of Moratuwa examined how pre-processing and coir extraction methods influence coir pith properties, including particle size, pH, electrical conductivity and water retention.",
    source:
      "University of Moratuwa, Influence of Pre-processing and Coir Extraction Methods on the Physicochemical Properties and Microbial Contamination of Coir Pith, 2015",
    url: "https://dl.lib.uom.lk/items/46de46a8-1b77-4098-a771-f44393735159",
  },
  {
    fact:
      "A University of Moratuwa study investigated coir pith drying conditions and their effects on properties such as water retention capacity and volume expansion.",
    source:
      "University of Moratuwa, Study the Factors Influencing Coir Pith Drying, 2016",
    url: "https://dl.lib.uom.lk/items/3128a502-f941-4935-b43c-537e6f312fa1",
  },
  {
    fact:
      "The Coconut Research Institute reports work on coir extraction machinery and coir pith drying technology in collaboration with the National Engineering Research and Development Centre.",
    source: "Coconut Research Institute, Coconut Processing Research Division",
    url: "https://cri.gov.lk/coconut-processing-research-division/",
  },
  {
    fact:
      "A 2025 University of Peradeniya study evaluated coir-based growing media mixtures containing coco peat, coco chips and short fibre, examining their physical and nutrient-related properties.",
    source:
      "University of Peradeniya, Characterizing Physicochemical Properties and Nutrient Leaching Behaviour of Different Coir-based Substrate Mixtures, 2025",
    url: "https://ir.lib.pdn.ac.lk/items/fae2a75d-171a-4958-96c6-8ac5c0dd3be4",
  },
  {
    fact:
      "The Coconut Development Authority lists compressed husk chips, grow bags, compressed fibre pith, coir yarn and geotextiles among Sri Lankan fibre and fibre-processed product categories.",
    source: "Coconut Development Authority",
    url: "https://www.cda.gov.lk/web/index.php?lang=en",
  },
];

export const RICE_SAMPLE_SOURCES: Source[] = [
  {
    fact:
      "Rice husks are separated from paddy during the rice milling process and are a by-product of rice processing.",
    source: "FAO, Rice: Post-harvest Operations",
    url: "https://www.fao.org/fileadmin/user_upload/inpho/docs/Post_Harvest_Compendium_-_RICE.pdf",
  },
  {
    fact:
      "A 2025 Sri Lankan research study investigated producing rice husk biomass briquettes for use in boilers and evaluated different particle sizes and binding materials.",
    source: "Journal of Advances in Engineering and Technology, SLIIT, 2025",
    url: "https://doi.org/10.54389/OXZG5595",
  },
  {
    fact:
      "A Sri Lankan study investigated paddy husk biochar as a soil amendment using a pot experiment. It examined changes in selected physical and chemical properties of Low Humic Gley soil in the Low Country Wet Zone.",
    source:
      "Najim, M.M.M. and Moragoda, N., Proceedings of the International Forestry and Environment Symposium, Volume 21, 2016",
    url: "https://journals.sjp.ac.lk/index.php/fesympo/article/download/3100/2240",
  },
  {
    fact:
      "A University of Ruhuna study analysed rice husks collected from Kurunegala, Galle and Hambantota and investigated a laboratory process for extracting silica from local rice husks.",
    source: "University of Ruhuna, Silica Extraction and Chemical Analysis of Rice Husk in Sri Lanka, 2022",
    url: "https://ir.lib.ruh.ac.lk/handle/iruor/5527",
  },
  {
    fact:
      "Sri Lankan researchers have investigated rice husk ash as an additive in fired clay bricks. One study reported improved compressive strength under its tested conditions.",
    source: "University of Moratuwa, Effect of Rice Husk Ash on Structural Properties of Fired Clay Bricks, 2016",
    url: "https://dl.lib.uom.lk/items/4bfa8ccd-27fe-47bf-a51b-477d45f4fd4a",
  },
];
