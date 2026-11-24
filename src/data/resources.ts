
export const resourceKnowledgeBase = {
  "Coconut husks": {
    resourceName: "Coconut husks",
    category: "Agricultural by-product",
    country: "Sri Lanka",

    verifiedFacts: [
      {
        fact: "Coconut husks are used to extract coir fibre. Fully ripened coconuts generally yield brown coir, while less mature coconut husks yield softer white coir.",
        source: "Sri Lanka Export Development Board, Coconut and Coconut-based Products",
        url: "https://www.srilankabusiness.com/coconut/sri-lankan-coconut-and-coconut-based-products.html",
      },
      {
        fact: "Sri Lankan coir fibre is used to manufacture products such as brushes, brooms, mats, ropes, twine and geotextiles.",
        source: "Sri Lanka Export Development Board, Coconut Fibre-based Products",
        url: "https://www.srilankabusiness.com/coconut/coconut-fibre-products.html",
      },
      {
        fact: "Coco peat, also known as coir pith, is the spongy material separated from coconut husks during coir fibre extraction. It is used as a raw material for coco peat-based products.",
        source: "Sri Lanka Export Development Board, Coco Peat-based Products",
        url: "https://www.srilankabusiness.com/coconut/coco-peat-products.html",
      },
      {
        fact: "Research at the University of Moratuwa examined how pre-processing and coir extraction methods influence coir pith properties, including particle size, pH, electrical conductivity and water retention.",
        source: "University of Moratuwa, Influence of Pre-processing and Coir Extraction Methods on the Physicochemical Properties and Microbial Contamination of Coir Pith, 2015",
        url: "https://dl.lib.uom.lk/items/46de46a8-1b77-4098-a771-f44393735159",
      },
      {
        fact: "A University of Moratuwa study investigated coir pith drying conditions and their effects on properties such as water retention capacity and volume expansion.",
        source: "University of Moratuwa, Study the Factors Influencing Coir Pith Drying, 2016",
        url: "https://dl.lib.uom.lk/items/3128a502-f941-4935-b43c-537e6f312fa1",
      },
      {
        fact: "The Coconut Research Institute reports work on coir extraction machinery and coir pith drying technology in collaboration with the National Engineering Research and Development Centre.",
        source: "Coconut Research Institute, Coconut Processing Research Division",
        url: "https://cri.gov.lk/coconut-processing-research-division/",
      },
      {
        fact: "A 2025 University of Peradeniya study evaluated coir-based growing media mixtures containing coco peat, coco chips and short fibre, examining their physical and nutrient-related properties.",
        source: "University of Peradeniya, Characterizing Physicochemical Properties and Nutrient Leaching Behaviour of Different Coir-based Substrate Mixtures, 2025",
        url: "https://ir.lib.pdn.ac.lk/items/fae2a75d-171a-4958-96c6-8ac5c0dd3be4",
      },
      {
        fact: "The Coconut Development Authority lists compressed husk chips, grow bags, compressed fibre pith, coir yarn and geotextiles among Sri Lankan fibre and fibre-processed product categories.",
        source: "Coconut Development Authority",
        url: "https://www.cda.gov.lk/web/index.php?lang=en",
      },
    ],

    pathways: [
      {
        id: "coir-fibre",
        name: "Coir fibre extraction",
        description:
          "Extracting natural fibre from coconut husks for use in fibre-based products.",
        potentialProducts: [
          "Coir fibre",
          "Coir yarn",
          "Coir twine",
          "Brushes",
          "Mats",
        ],
        requirements: [
          "A reliable supply of suitable coconut husks",
          "Access to fibre extraction equipment or a processing partner",
          "Labour and suitable working space",
          "Drying and storage arrangements",
          "Quality control",
        ],
        challenges: [
          "Equipment and processing costs",
          "Availability and condition of husks",
          "Water and drying requirements depending on the process",
          "Consistent fibre quality",
          "Finding suitable buyers",
        ],
        feasibilityQuestions: [
          "Are the husks fresh, mature or dry?",
          "Is fibre extraction equipment available nearby?",
          "Can the user sell raw fibre to an existing processor?",
          "What quality specifications do potential buyers require?",
        ],
      },

      {
        id: "coco-peat",
        name: "Coco peat production",
        description:
          "Recovering and processing coir pith, the spongy material separated during coir fibre extraction.",
        potentialProducts: [
          "Loose coco peat",
          "Compressed coco peat blocks",
          "Grow bags",
          "Growing medium products",
        ],
        requirements: [
          "Access to coir pith",
          "Suitable washing facilities when required by the buyer",
          "Drying arrangements",
          "Sieving and grading equipment",
          "Compression and packaging equipment for compressed products",
          "Quality testing and storage",
        ],
        challenges: [
          "Coir pith must meet the intended buyer's quality requirements",
          "Washing and drying can require significant resources",
          "Salt content and electrical conductivity may need testing",
          "Packaging and transport costs",
          "Competition and buyer specifications",
        ],
        feasibilityQuestions: [
          "Can the user access coir pith from a nearby fibre mill?",
          "Is there a suitable water supply?",
          "Can the user dry and store the material properly?",
          "Are local growers or established processors interested in purchasing it?",
        ],
      },

      {
        id: "husk-chips",
        name: "Coconut husk chips",
        description:
          "Processing coconut husks into chips for potential use in growing media and related applications.",
        potentialProducts: [
          "Coconut husk chips",
          "Compressed husk chips",
          "Growing media blends",
        ],
        requirements: [
          "Suitable coconut husks",
          "Cutting or chipping equipment",
          "Drying and storage facilities",
          "Screening and size control",
          "Suitable packaging",
        ],
        challenges: [
          "Equipment and electricity costs",
          "Consistent chip size",
          "Storage and moisture management",
          "Transport and buyer requirements",
        ],
        feasibilityQuestions: [
          "Is suitable chipping equipment available?",
          "Are local nurseries or growers potential buyers?",
          "What chip size and quality do buyers require?",
        ],
      },

      {
        id: "value-added-coir",
        name: "Value-added coir products",
        description:
          "Using processed coir fibre or pith to manufacture finished products.",
        potentialProducts: [
          "Coir pots",
          "Coir mats",
          "Coir brushes",
          "Coir ropes",
          "Grow bags",
          "Geotextiles",
        ],
        requirements: [
          "Suitable processed fibre or pith",
          "Product-specific machinery and tools",
          "Production skills",
          "Quality control",
          "Packaging and access to buyers",
        ],
        challenges: [
          "Higher production complexity",
          "Product-specific equipment costs",
          "Quality and durability requirements",
          "Competition and market access",
        ],
        feasibilityQuestions: [
          "Which product has accessible local buyers?",
          "Can the user obtain processed fibre instead of processing raw husks?",
          "Can production be started through a small pilot?",
          "What standards or specifications apply to the selected product?",
        ],
      },
    ],

    generalWarnings: [
      "Access to coconut husks does not automatically mean the user can manufacture finished coir products.",
      "Processing requirements depend on the selected product and the condition of the husks.",
      "Do not assume that all pathways are suitable for a small starting budget.",
      "Do not invent selling prices, profit margins, market demand or environmental savings.",
      "Coir pith quality depends on processing and may require testing for properties such as moisture, pH, electrical conductivity and water retention.",
      "Do not assume that every coconut husk processing method produces the same fibre or pith quality.",
      "Verify machinery costs, operating costs, buyer requirements and regulations before investment.",
    ],

    localResearchQuestions: [
      "How many coconut husks are available each month?",
      "Are they collected from one source or multiple suppliers?",
      "Are there existing coir mills within practical transport distance?",
      "Can the user access a processing partner?",
      "Who might purchase the resulting material or product?",
    ],
  },

  "Rice husks": {
    resourceName: "Rice husks",
    category: "Agricultural by-product",
    country: "Sri Lanka",

    verifiedFacts: [
      {
        fact: "Rice husks are separated from paddy during the rice milling process and are a by-product of rice processing.",
        source: "FAO, Rice: Post-harvest Operations",
        url: "https://www.fao.org/fileadmin/user_upload/inpho/docs/Post_Harvest_Compendium_-_RICE.pdf",
      },
      {
        fact: "A 2025 Sri Lankan research study investigated producing rice husk biomass briquettes for use in boilers and evaluated different particle sizes and binding materials.",
        source: "Journal of Advances in Engineering and Technology, SLIIT, 2025",
        url: "https://doi.org/10.54389/OXZG5595",
      },

{
  fact: "A Sri Lankan study investigated paddy husk biochar as a soil amendment using a pot experiment. It examined changes in selected physical and chemical properties of Low Humic Gley soil in the Low Country Wet Zone.",
  source: "Najim, M.M.M. and Moragoda, N., Proceedings of the International Forestry and Environment Symposium, Volume 21, 2016",
  url: "https://journals.sjp.ac.lk/index.php/fesympo/article/download/3100/2240",
},


      {
        fact: "A University of Ruhuna study analysed rice husks collected from Kurunegala, Galle and Hambantota and investigated a laboratory process for extracting silica from local rice husks.",
        source: "University of Ruhuna, Silica Extraction and Chemical Analysis of Rice Husk in Sri Lanka, 2022",
        url: "https://ir.lib.ruh.ac.lk/handle/iruor/5527",
      },
      {
        fact: "Sri Lankan researchers have investigated rice husk ash as an additive in fired clay bricks. One study reported improved compressive strength under its tested conditions.",
        source: "University of Moratuwa, Effect of Rice Husk Ash on Structural Properties of Fired Clay Bricks, 2016",
        url: "https://dl.lib.uom.lk/items/4bfa8ccd-27fe-47bf-a51b-477d45f4fd4a",
      },
    ],

    pathways: [
      {
        id: "raw-rice-husk-supply",
        name: "Raw rice husk collection and supply",
        description:
          "Collecting, sorting, storing and supplying rice husks to existing users or processors without undertaking advanced manufacturing.",
        potentialProducts: [
          "Raw rice husks",
          "Bulk rice husk supply",
          "Sorted and packaged rice husks",
        ],
        requirements: [
          "Reliable access to rice mills or husk suppliers",
          "Suitable dry storage",
          "Handling and collection arrangements",
          "Transport access",
          "Identification of potential buyers",
        ],
        challenges: [
          "Low value per unit may make transport uneconomical",
          "Storage space requirements",
          "Moisture and contamination",
          "Seasonal supply fluctuations",
          "Finding buyers willing to collect or purchase",
        ],
        feasibilityQuestions: [
          "How much rice husk is available regularly?",
          "Can the user collect directly from a rice mill?",
          "Are potential buyers located within a practical transport distance?",
          "Would buyers collect the material themselves?",
          "What condition and quality do buyers require?",
        ],
      },

      {
        id: "rice-husk-biomass",
        name: "Rice husk biomass fuel supply",
        description:
          "Supplying rice husks for potential use as biomass fuel in suitable industrial or energy applications, subject to buyer equipment compatibility and fuel specifications.",
        potentialProducts: [
          "Bulk rice husk biomass",
          "Sorted rice husk fuel",
          "Regular biomass supply contracts",
        ],
        requirements: [
          "Consistent husk supply",
          "Dry storage and moisture management",
          "Handling and transport",
          "Potential industrial buyers",
          "Understanding of buyer fuel specifications",
        ],
        challenges: [
          "Not all boilers or fuel systems can use rice husks",
          "Moisture and fuel quality affect suitability",
          "Transport and handling costs",
          "Competition with other biomass fuels",
          "Buyer demand must be confirmed",
        ],
        feasibilityQuestions: [
          "Are there industries nearby that use biomass boilers?",
          "Can the buyer's equipment accept rice husks?",
          "What moisture and quality specifications apply?",
          "Would the buyer purchase loose husks or require a processed form?",
          "Can supply and transport costs be justified?",
        ],
      },

      {
        id: "rice-husk-biochar",
        name: "Rice husk biochar production",
        description:
          "Converting rice husks through controlled thermal processing into biochar for potential agricultural or other applications. The intended use must be evaluated before production.",
        potentialProducts: [
          "Rice husk biochar",
          "Processed biochar for agricultural trials",
          "Biochar-based soil amendment products, subject to testing",
        ],
        requirements: [
          "Suitable controlled processing equipment",
          "Safe operating area",
          "Knowledge of thermal processing",
          "Cooling and safe handling arrangements",
          "Quality testing",
          "Potential agricultural users or research partners",
        ],
        challenges: [
          "Equipment and setup costs",
          "Fire, heat, smoke and worker safety risks",
          "Consistent product quality",
          "The final product may require testing for intended use",
          "Buyer demand and product acceptance are not guaranteed",
        ],
        feasibilityQuestions: [
          "Is suitable biochar processing equipment accessible?",
          "Does the user have experience or technical support?",
          "What safety measures and local requirements apply?",
          "Has the biochar been tested for the intended agricultural use?",
          "Are farmers, growers or other potential buyers willing to trial it?",
        ],
      },

      {
        id: "rice-husk-ash",
        name: "Rice husk ash applications",
        description:
          "Exploring applications for rice husk ash generated through controlled processing, including possible construction-material applications that require technical validation.",
        potentialProducts: [
          "Rice husk ash for research or material trials",
          "Potential construction-material inputs",
          "Ash supplied to a suitable processing partner",
        ],
        requirements: [
          "A reliable source of rice husk ash",
          "Controlled production or access to an existing producer",
          "Appropriate ash handling and storage",
          "Material testing",
          "Technical partners and potential buyers",
        ],
        challenges: [
          "Ash quality varies depending on processing conditions",
          "Dust exposure and safe handling",
          "Testing and quality requirements",
          "Construction applications may require technical approval",
          "Advanced applications may not be suitable for a small beginner venture",
        ],
        feasibilityQuestions: [
          "Can the user obtain ash from an existing controlled producer?",
          "What properties and quality specifications does the intended buyer require?",
          "Can testing be accessed affordably?",
          "Is there a research institution or manufacturer willing to collaborate?",
          "Is there a confirmed buyer for the ash?",
        ],
      },
    ],

    generalWarnings: [
      "Rice husks are a by-product, but access to them does not guarantee that they can be sold profitably.",
      "Transport, handling, storage and moisture can significantly affect feasibility.",
      "Do not assume all biomass boilers or industrial equipment can use rice husks.",
      "Biochar production involves heat, smoke, fire and operational safety risks. Do not recommend improvised production equipment.",
      "Rice husk ash applications require suitable processing and material testing. Do not claim that ash is automatically suitable for construction.",
      "Silica extraction is a technical processing pathway and should not be recommended as a simple beginner business without suitable expertise, equipment and validation.",
      "Do not invent selling prices, profit margins, market demand, carbon reductions or agricultural performance claims.",
      "Verify equipment costs, operating costs, transport, buyer requirements, safety, and applicable regulations before investment.",
    ],

    localResearchQuestions: [
      "How much rice husk is available and during which periods?",
      "Is the resource available from a rice mill, farmer or intermediary?",
      "Can the user collect the husks directly?",
      "What are the distances to potential buyers or processors?",
      "Are nearby industries using biomass fuel?",
      "Are there existing biochar producers or research partners?",
      "What storage and transport facilities are available?",
      "Has a potential buyer confirmed interest and specifications?",
    ],
  },
};
