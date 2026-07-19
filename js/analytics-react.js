const {
    useEffect,
    useMemo,
    useRef,
    useState
} = React;


/************************************************
    CANADIAN CLASSIC RECORD DATA

    Data order:
    [Squat, Bench Press, Deadlift]

    This is a static prototype dataset.
    National records may change, so the site also
    links to the official record page.
************************************************/

const recordData = {

    Men: {

        "Sub-Junior": {
            "53": [140, 105, 180],
            "59": [190.5, 107.5, 238],
            "66": [206, 136.5, 253],
            "74": [240, 157.5, 286],
            "83": [265, 167.5, 295.5],
            "93": [272, 187.5, 290.5],
            "105": [300, 193, 300.5],
            "120": [300, 192, 326.5],
            "120+": [317.5, 210.5, 291]
        },

        Junior: {
            "53": [170.5, 122.5, 202.5],
            "59": [203, 148, 275],
            "66": [250.5, 160, 307.5],
            "74": [272.5, 175, 315],
            "83": [295, 197, 350],
            "93": [331.5, 197.5, 342],
            "105": [333, 210.5, 338],
            "120": [352.5, 211, 340],
            "120+": [350.5, 228.5, 335]
        },

        Open: {
            "59": [205, 148, 275],
            "66": [250.5, 171.5, 318],
            "74": [295, 193, 325],
            "83": [308, 205, 367.5],
            "93": [331.5, 220.5, 370],
            "105": [345, 228, 376],
            "120": [375, 240.5, 386.5],
            "120+": [390, 259, 379]
        },

        "Master 1": {
            "59": [193, 118.5, 200],
            "66": [216, 171.5, 270],
            "74": [243, 155.5, 290],
            "83": [272.5, 173, 300],
            "93": [278, 205.5, 305],
            "105": [300.5, 224.5, 318.5],
            "120": [320, 228, 305],
            "120+": [390, 245, 370]
        },

        "Master 2": {
            "59": [118, 67.5, 157.5],
            "66": [216, 160, 259],
            "74": [210, 143, 260.5],
            "83": [235.5, 158, 270],
            "93": [256.5, 175, 283],
            "105": [300.5, 224.5, 280],
            "120": [320, 225, 304.5],
            "120+": [320, 227.5, 300]
        },

        "Master 3": {
            "59": [118, 67.5, 157.5],
            "66": [167.5, 122.5, 191],
            "74": [210, 120, 236],
            "83": [205, 137.5, 252.5],
            "93": [232.5, 150, 245.5],
            "105": [238, 166, 255],
            "120": [280, 178, 290],
            "120+": [242.5, 162.5, 287.5]
        },

        "Master 4": {
            "59": [null, null, null],
            "66": [109, 63, 166],
            "74": [177.5, 85, 200],
            "83": [157.5, 137.5, 210],
            "93": [200, 142.5, 220],
            "105": [185, 132.5, 230],
            "120": [205, 135, 210.5],
            "120+": [152.5, 130, 225]
        }
    },

    Women: {

        "Sub-Junior": {
            "43": [80.5, 57.5, 97],
            "47": [107.5, 60.5, 130],
            "52": [117.5, 80, 135.5],
            "57": [142.5, 79, 157.5],
            "63": [155, 95, 170],
            "69": [175, 123.5, 190],
            "76": [160, 102.5, 200],
            "84": [160.5, 82.5, 186],
            "84+": [205.5, 103.5, 200]
        },

        Junior: {
            "43": [104, 67, 125],
            "47": [132.5, 82.5, 170.5],
            "52": [145.5, 91.5, 170.5],
            "57": [163.5, 107.5, 192.5],
            "63": [183, 108, 198.5],
            "69": [190, 123.5, 225],
            "76": [206, 118, 230],
            "84": [206.5, 122.5, 230.5],
            "84+": [240, 130.5, 230]
        },

        Open: {
            "47": [160, 93, 188.5],
            "52": [175, 98.5, 190],
            "57": [179.5, 118, 197.5],
            "63": [185.5, 121.5, 210],
            "69": [205.5, 123.5, 225],
            "76": [218, 122.5, 263],
            "84": [225, 141.5, 250.5],
            "84+": [302.5, 165, 289]
        },

        "Master 1": {
            "47": [123, 68, 160],
            "52": [153, 98.5, 182.5],
            "57": [145, 83.5, 171],
            "63": [150, 87, 202.5],
            "69": [183, 96, 197],
            "76": [185.5, 98, 210.5],
            "84": [188.5, 102.5, 205],
            "84+": [210, 117.5, 232.5]
        },

        "Master 2": {
            "47": [120, 60, 140],
            "52": [115.5, 64, 155],
            "57": [124.5, 77.5, 160],
            "63": [136.5, 83, 183],
            "69": [183, 85, 197],
            "76": [185, 98, 204],
            "84": [172, 97.5, 193],
            "84+": [176.5, 110, 195.5]
        },

        "Master 3": {
            "47": [89, 54, 120],
            "52": [110.5, 62.5, 140],
            "57": [102.5, 60, 128],
            "63": [120, 67.5, 143],
            "69": [118, 75.5, 165],
            "76": [136.5, 77, 180.5],
            "84": [131, 70.5, 153],
            "84+": [158, 78, 172.5]
        },

        "Master 4": {
            "47": [73, 35.5, 106],
            "52": [63, 42.5, 95],
            "57": [87.5, 40, 95],
            "63": [93, 47.5, 128],
            "69": [95, 47.5, 122.5],
            "76": [87.5, 45, 117.5],
            "84": [111, 53.5, 136.5],
            "84+": [95, 54.5, 133]
        }
    }
};


/************************************************
    AGE DIVISIONS
************************************************/

const ageDivisions = [
    "Sub-Junior",
    "Junior",
    "Open",
    "Master 1",
    "Master 2",
    "Master 3",
    "Master 4"
];


/************************************************
    ACTIVITY LEVELS

    English descriptions intentionally use "train".
************************************************/

const activityLevels = [
    {
        value: 1.2,
        key: "sedentary"
    },
    {
        value: 1.375,
        key: "light"
    },
    {
        value: 1.55,
        key: "moderate"
    },
    {
        value: 1.725,
        key: "very"
    },
    {
        value: 1.9,
        key: "extreme"
    }
];


/************************************************
    TRANSLATIONS
************************************************/

const translations = {

    en: {
        kicker: "Interactive powerlifting analytics",
        siteTitle: "Athlete Stats",
        siteSubtitle:
            "Compare your competition lifts with Canadian Classic records and estimate your daily energy and macronutrient distribution.",

        language: "Language",
        strengthNav: "Strength Comparison",
        nutritionNav: "Nutrition & Calories",

        men: "Men",
        women: "Women",

        generate: "Generate Comparison",
        calculate: "Calculate",
        reset: "Reset",
        editInputs: "Edit Inputs",

        strengthTitle: "Strength Comparison",
        strengthDescription:
            "Enter your competition category and personal SBD results to compare your strength profile with Canadian individual lift records.",

        strengthInputTitle: "Compare Your Lifts",
        strengthInputText:
            "Choose the record category that you want to compare against. Enter all three lifts in kilograms.",

        gender: "Gender category",
        division: "Age division",
        weightClass: "Weight class",
        squat: "Squat",
        bench: "Bench Press",
        deadlift: "Deadlift",

        ageRule:
            "Age divisions follow competition-year rules. Open overlaps with Junior and Master categories because eligible lifters may also compete in Open.",

        invalidLifts:
            "Enter a valid number greater than zero for squat, bench press, and deadlift.",

        missingRecord:
            "A complete national record is not available for this category.",

        emptyStrengthTitle: "Your comparison will appear here",
        emptyStrengthText:
            "Complete the form and select Generate Comparison to display the line chart and detailed table.",

        selectedCategory: "Selected category",
        enteredTotal: "Your entered total",
        recordSum: "Sum of individual records",
        recordSumNote:
            "The three records may belong to different athletes. This is not an official total record.",

        strengthChartTitle: "Your Lifts vs Canadian National Records",
        strengthChartDescription:
            "The line chart compares your strength profile across squat, bench press, and deadlift with individual Canadian Classic records.",

        classicRecords: "Classic Records",
        weightLifted: "Weight lifted (kg)",
        yourLifts: "Your Lifts",
        canadianRecords: "Canadian Individual Lift Records",

        detailedComparison: "Detailed Comparison",
        lift: "Lift",
        yourResult: "Your Result",
        canadianRecord: "Canadian Record",
        remaining: "Remaining to Record",
        recordReached: "Record reached",

        recordSource:
            "This prototype uses a static record dataset. National records may change, so confirm current results using the official source.",
        viewRecords: "View Official Records",

        nutritionTitle: "Nutrition & Calories",
        nutritionDescription:
            "Estimate your resting energy needs, daily maintenance calories, and macronutrient distribution.",

        nutritionInputTitle: "Estimate Your Daily Energy Needs",
        nutritionInputText:
            "Enter your information and choose the activity level that best reflects your usual training and daily activity.",

        age: "Age",
        height: "Height",
        weight: "Weight",
        activityLevel: "Activity level",

        adultNote:
            "This educational calculator is designed for adults aged 19 and older. Actual energy needs can vary.",

        invalidNutrition:
            "Enter a valid age of 19 or older, height in centimetres, and weight in kilograms.",

        emptyNutritionTitle: "Your nutrition estimate will appear here",
        emptyNutritionText:
            "Complete the form and select Calculate to display your energy estimate, interactive chart, and nutrition table.",

        estimatedEnergy: "Your Estimated Daily Energy",
        bmr: "Basal Metabolic Rate",
        bmrNote: "Estimated energy used by your body at rest.",
        maintenance: "Estimated Maintenance Calories",
        maintenanceNote:
            "Estimated daily energy required to maintain your current body weight.",
        selectedActivity: "Selected Activity",
        activityFactor: "Activity factor",

        macroTitle: "Customize Macronutrient Distribution",
        macroDescription:
            "Use the balanced reference or create a custom distribution. The three percentages must total 100%.",

        balancedReference: "Balanced Reference",
        custom: "Custom",
        carbs: "Carbohydrates",
        protein: "Protein",
        fat: "Fat",
        total: "Total",
        applyDistribution: "Apply Distribution",
        macroInvalid:
            "The carbohydrate, protein, and fat percentages must total 100%.",

        macroReference:
            "Adult reference ranges: carbohydrates 45–65%, protein 10–35%, and fat 20–35%.",

        nutritionChartTitle: "Daily Calorie Distribution",
        nutritionChartDescription:
            "The horizontal stacked bar compares the percentage of daily calories assigned to carbohydrates, protein, and fat.",

        currentDistribution: "Current Distribution",
        dailyCalories: "Daily calories",

        nutritionTable: "Macronutrient Breakdown",
        nutrient: "Nutrient",
        distribution: "Distribution",
        calories: "Calories",
        caloriesPerGram: "Energy per Gram",
        estimatedAmount: "Estimated Amount",

        educationalDisclaimer:
            "Educational estimate only. This page does not provide individualized medical or dietary advice. Energy needs and appropriate nutrient intake can vary between individuals.",

        divisionNames: {
            "Sub-Junior": "Sub-Junior",
            "Junior": "Junior",
            "Open": "Open",
            "Master 1": "Master 1",
            "Master 2": "Master 2",
            "Master 3": "Master 3",
            "Master 4": "Master 4"
        },

        divisionAges: {
            "Sub-Junior": "14–18 years",
            "Junior": "19–23 years",
            "Open": "19 years and older",
            "Master 1": "40–49 years",
            "Master 2": "50–59 years",
            "Master 3": "60–69 years",
            "Master 4": "70 years and older"
        },

        activities: {
            sedentary: {
                name: "Sedentary",
                note: "Little or no structured training"
            },

            light: {
                name: "Lightly Active",
                note: "Train 1–3 days per week"
            },

            moderate: {
                name: "Moderately Active",
                note: "Train 3–5 days per week"
            },

            very: {
                name: "Very Active",
                note: "Train 6–7 days per week"
            },

            extreme: {
                name: "Extremely Active",
                note: "Intense training plus a physically active job"
            }
        }
    },


    fr: {
        kicker: "Analyse interactive de force athlétique",
        siteTitle: "Statistiques de l’athlète",
        siteSubtitle:
            "Comparez vos mouvements aux records canadiens classiques et estimez vos besoins énergétiques et votre répartition des macronutriments.",

        language: "Langue",
        strengthNav: "Comparaison de force",
        nutritionNav: "Nutrition et calories",

        men: "Hommes",
        women: "Femmes",

        generate: "Générer la comparaison",
        calculate: "Calculer",
        reset: "Réinitialiser",
        editInputs: "Modifier les données",

        strengthTitle: "Comparaison de force",
        strengthDescription:
            "Entrez votre catégorie de compétition et vos résultats SBD pour comparer votre profil aux records canadiens individuels.",

        strengthInputTitle: "Comparez vos mouvements",
        strengthInputText:
            "Choisissez la catégorie de records et entrez les trois mouvements en kilogrammes.",

        gender: "Catégorie de genre",
        division: "Catégorie d’âge",
        weightClass: "Catégorie de poids",
        squat: "Squat",
        bench: "Développé couché",
        deadlift: "Soulevé de terre",

        ageRule:
            "Les catégories d’âge suivent les règles de l’année de compétition. La catégorie Open chevauche les catégories Junior et Master.",

        invalidLifts:
            "Entrez un nombre valide supérieur à zéro pour les trois mouvements.",

        missingRecord:
            "Un record national complet n’est pas disponible pour cette catégorie.",

        emptyStrengthTitle: "Votre comparaison apparaîtra ici",
        emptyStrengthText:
            "Remplissez le formulaire et sélectionnez Générer la comparaison pour afficher le graphique et le tableau.",

        selectedCategory: "Catégorie sélectionnée",
        enteredTotal: "Total saisi",
        recordSum: "Somme des records individuels",
        recordSumNote:
            "Les trois records peuvent appartenir à différents athlètes. Il ne s’agit pas d’un record officiel au total.",

        strengthChartTitle: "Vos mouvements et les records canadiens",
        strengthChartDescription:
            "Le graphique compare votre profil de force aux records canadiens classiques individuels.",

        classicRecords: "Records classiques",
        weightLifted: "Poids soulevé (kg)",
        yourLifts: "Vos mouvements",
        canadianRecords: "Records canadiens individuels",

        detailedComparison: "Comparaison détaillée",
        lift: "Mouvement",
        yourResult: "Votre résultat",
        canadianRecord: "Record canadien",
        remaining: "Écart avant le record",
        recordReached: "Record atteint",

        recordSource:
            "Ce prototype utilise un ensemble de données statique. Consultez la source officielle pour vérifier les records actuels.",
        viewRecords: "Voir les records officiels",

        nutritionTitle: "Nutrition et calories",
        nutritionDescription:
            "Estimez vos besoins énergétiques au repos, vos calories de maintien et la répartition de vos macronutriments.",

        nutritionInputTitle: "Estimez vos besoins énergétiques",
        nutritionInputText:
            "Entrez vos informations et choisissez le niveau d’activité correspondant à votre entraînement et à vos activités quotidiennes.",

        age: "Âge",
        height: "Taille",
        weight: "Poids",
        activityLevel: "Niveau d’activité",

        adultNote:
            "Ce calculateur éducatif est conçu pour les adultes de 19 ans et plus. Les besoins réels peuvent varier.",

        invalidNutrition:
            "Entrez un âge valide de 19 ans ou plus, une taille en centimètres et un poids en kilogrammes.",

        emptyNutritionTitle: "Votre estimation apparaîtra ici",
        emptyNutritionText:
            "Remplissez le formulaire et sélectionnez Calculer pour afficher l’estimation, le graphique interactif et le tableau.",

        estimatedEnergy: "Votre énergie quotidienne estimée",
        bmr: "Métabolisme de base",
        bmrNote: "Énergie estimée utilisée par le corps au repos.",
        maintenance: "Calories de maintien estimées",
        maintenanceNote:
            "Énergie quotidienne estimée nécessaire pour maintenir le poids actuel.",
        selectedActivity: "Activité sélectionnée",
        activityFactor: "Facteur d’activité",

        macroTitle: "Personnaliser les macronutriments",
        macroDescription:
            "Utilisez la répartition équilibrée ou créez une répartition personnalisée. Le total doit être de 100 %.",

        balancedReference: "Répartition équilibrée",
        custom: "Personnalisée",
        carbs: "Glucides",
        protein: "Protéines",
        fat: "Lipides",
        total: "Total",
        applyDistribution: "Appliquer la répartition",
        macroInvalid:
            "Les pourcentages de glucides, protéines et lipides doivent totaliser 100 %.",

        macroReference:
            "Plages de référence pour adultes : glucides 45–65 %, protéines 10–35 % et lipides 20–35 %.",

        nutritionChartTitle: "Répartition quotidienne des calories",
        nutritionChartDescription:
            "La barre horizontale empilée compare les calories provenant des glucides, des protéines et des lipides.",

        currentDistribution: "Répartition actuelle",
        dailyCalories: "Calories quotidiennes",

        nutritionTable: "Répartition des macronutriments",
        nutrient: "Nutriment",
        distribution: "Répartition",
        calories: "Calories",
        caloriesPerGram: "Énergie par gramme",
        estimatedAmount: "Quantité estimée",

        educationalDisclaimer:
            "Estimation éducative seulement. Cette page ne fournit pas de conseils médicaux ou alimentaires personnalisés. Les besoins varient selon les personnes.",

        divisionNames: {
            "Sub-Junior": "Sous-junior",
            "Junior": "Junior",
            "Open": "Open",
            "Master 1": "Master 1",
            "Master 2": "Master 2",
            "Master 3": "Master 3",
            "Master 4": "Master 4"
        },

        divisionAges: {
            "Sub-Junior": "14 à 18 ans",
            "Junior": "19 à 23 ans",
            "Open": "19 ans et plus",
            "Master 1": "40 à 49 ans",
            "Master 2": "50 à 59 ans",
            "Master 3": "60 à 69 ans",
            "Master 4": "70 ans et plus"
        },

        activities: {
            sedentary: {
                name: "Sédentaire",
                note: "Peu ou aucun entraînement structuré"
            },

            light: {
                name: "Légèrement actif",
                note: "S’entraîner 1 à 3 jours par semaine"
            },

            moderate: {
                name: "Modérément actif",
                note: "S’entraîner 3 à 5 jours par semaine"
            },

            very: {
                name: "Très actif",
                note: "S’entraîner 6 à 7 jours par semaine"
            },

            extreme: {
                name: "Extrêmement actif",
                note: "Entraînement intense et travail physiquement actif"
            }
        }
    }
};


/************************************************
    HELPER FUNCTIONS
************************************************/

function getWeightClasses(gender, division) {
    const youthDivision =
        division === "Sub-Junior" ||
        division === "Junior";

    if (gender === "Men") {
        return youthDivision
            ? [
                "53",
                "59",
                "66",
                "74",
                "83",
                "93",
                "105",
                "120",
                "120+"
            ]
            : [
                "59",
                "66",
                "74",
                "83",
                "93",
                "105",
                "120",
                "120+"
            ];
    }

    return youthDivision
        ? [
            "43",
            "47",
            "52",
            "57",
            "63",
            "69",
            "76",
            "84",
            "84+"
        ]
        : [
            "47",
            "52",
            "57",
            "63",
            "69",
            "76",
            "84",
            "84+"
        ];
}


function getOfficialRecordUrl(gender, division) {
    return (
        "https://data.powerlifting.ca/" +
        "lifter_database/external/nat_records.php" +
        `?active=Yes&age=${encodeURIComponent(division)}` +
        `&gender=${encodeURIComponent(gender)}` +
        "&style=Classic"
    );
}


function formatNumber(value, language, decimals = 1) {
    const locale =
        language === "fr"
            ? "fr-CA"
            : "en-CA";

    return new Intl.NumberFormat(locale, {
        maximumFractionDigits: decimals
    }).format(value);
}


/************************************************
    MAIN APP
************************************************/

function AnalyticsApp() {
    const [page, setPage] = useState("strength");
    const [language, setLanguage] = useState("en");

    const text = translations[language];

    useEffect(() => {
        document.documentElement.lang = language;
    }, [language]);

    return (
        <div className="analytics-page">

            <AnalyticsHeading
                language={language}
                setLanguage={setLanguage}
                text={text}
            />

            <AnalyticsSubNav
                page={page}
                setPage={setPage}
                text={text}
            />

            {page === "strength" && (
                <StrengthComparisonPage
                    language={language}
                    text={text}
                />
            )}

            {page === "nutrition" && (
                <NutritionPage
                    language={language}
                    text={text}
                />
            )}

        </div>
    );
}


/************************************************
    HEADING
************************************************/

function AnalyticsHeading({
    language,
    setLanguage,
    text
}) {
    return (
        <header className="analytics-heading-section">

            <div className="container">

                <div className="analytics-heading-layout">

                    <div>
                        <p className="analytics-kicker">
                            {text.kicker}
                        </p>

                        <h1 className="analytics-main-title">
                            {text.siteTitle}
                        </h1>

                        <p className="analytics-main-subtitle">
                            {text.siteSubtitle}
                        </p>
                    </div>

                    <div className="analytics-language-area">

                        <span className="analytics-language-label">
                            {text.language}
                        </span>

                        <div className="analytics-language-switcher">

                            <button
                                type="button"
                                className={
                                    `analytics-language-button ${
                                        language === "en"
                                            ? "is-active"
                                            : ""
                                    }`
                                }
                                onClick={() => setLanguage("en")}
                                aria-pressed={language === "en"}
                            >
                                EN
                            </button>

                            <button
                                type="button"
                                className={
                                    `analytics-language-button ${
                                        language === "fr"
                                            ? "is-active"
                                            : ""
                                    }`
                                }
                                onClick={() => setLanguage("fr")}
                                aria-pressed={language === "fr"}
                            >
                                FR
                            </button>

                        </div>
                    </div>

                </div>
            </div>

        </header>
    );
}


/************************************************
    SUB NAVIGATION
************************************************/

function AnalyticsSubNav({
    page,
    setPage,
    text
}) {
    function changePage(nextPage) {
        setPage(nextPage);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    return (
        <section className="analytics-subnav-section">

            <div className="container-fluid">

                <nav
                    className="analytics-subnav"
                    aria-label="Analytics sections"
                >
                    <button
                        type="button"
                        className={
                            `analytics-nav-button ${
                                page === "strength"
                                    ? "is-active"
                                    : ""
                            }`
                        }
                        onClick={() => changePage("strength")}
                    >
                        {text.strengthNav}
                    </button>

                    <button
                        type="button"
                        className={
                            `analytics-nav-button ${
                                page === "nutrition"
                                    ? "is-active"
                                    : ""
                            }`
                        }
                        onClick={() => changePage("nutrition")}
                    >
                        {text.nutritionNav}
                    </button>
                </nav>

            </div>

        </section>
    );
}


/************************************************
    STRENGTH PAGE
************************************************/

function StrengthComparisonPage({
    language,
    text
}) {
    const defaultForm = {
        gender: "Women",
        division: "Open",
        weightClass: "57",
        squat: "",
        bench: "",
        deadlift: ""
    };

    const [form, setForm] = useState(defaultForm);
    const [comparison, setComparison] = useState(null);
    const [error, setError] = useState("");

    const weightClasses = useMemo(() => {
        return getWeightClasses(
            form.gender,
            form.division
        );
    }, [
        form.gender,
        form.division
    ]);


    function updateCategory(field, value) {
        setForm((current) => {
            const updated = {
                ...current,
                [field]: value
            };

            if (
                field === "gender" ||
                field === "division"
            ) {
                const newClasses =
                    getWeightClasses(
                        updated.gender,
                        updated.division
                    );

                if (
                    !newClasses.includes(
                        updated.weightClass
                    )
                ) {
                    updated.weightClass = newClasses[0];
                }
            }

            return updated;
        });

        setError("");
    }


    function updateLift(field, value) {
        setForm((current) => ({
            ...current,
            [field]: value
        }));

        setError("");
    }


    function generateComparison(event) {
        event.preventDefault();

        const userValues = [
            Number(form.squat),
            Number(form.bench),
            Number(form.deadlift)
        ];

        const valid =
            userValues.every((value) => (
                Number.isFinite(value) &&
                value > 0
            ));

        if (!valid) {
            setError(text.invalidLifts);
            setComparison(null);
            return;
        }

        const records =
            recordData[form.gender]?.[form.division]?.[
                form.weightClass
            ];

        if (
            !records ||
            records.some((value) => value === null)
        ) {
            setError(text.missingRecord);
            setComparison(null);
            return;
        }

        setComparison({
            gender: form.gender,
            division: form.division,
            weightClass: form.weightClass,
            userValues,
            recordValues: records
        });

        setError("");

        window.setTimeout(() => {
            document
                .getElementById("strength-results")
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
        }, 100);
    }


    function resetForm() {
        setForm(defaultForm);
        setComparison(null);
        setError("");
    }


    return (
        <section className="analytics-content-section">

            <div className="container">

                <div className="analytics-section-heading">

                    <h1 className="analytics-section-title">
                        {text.strengthTitle}
                    </h1>

                    <p className="analytics-section-description">
                        {text.strengthDescription}
                    </p>

                </div>

                <form
                    id="strength-inputs"
                    className="analytics-input-panel"
                    onSubmit={generateComparison}
                >
                    <h2 className="analytics-input-panel-title">
                        {text.strengthInputTitle}
                    </h2>

                    <p className="analytics-input-panel-text">
                        {text.strengthInputText}
                    </p>

                    <div className="analytics-form-grid">

                        <div className="analytics-form-group">

                            <label htmlFor="strength-gender">
                                {text.gender}
                            </label>

                            <select
                                id="strength-gender"
                                value={form.gender}
                                onChange={(event) =>
                                    updateCategory(
                                        "gender",
                                        event.target.value
                                    )
                                }
                            >
                                <option value="Women">
                                    {text.women}
                                </option>

                                <option value="Men">
                                    {text.men}
                                </option>
                            </select>
                        </div>

                        <div className="analytics-form-group">

                            <label htmlFor="strength-division">
                                {text.division}
                            </label>

                            <select
                                id="strength-division"
                                value={form.division}
                                onChange={(event) =>
                                    updateCategory(
                                        "division",
                                        event.target.value
                                    )
                                }
                            >
                                {ageDivisions.map((division) => (
                                    <option
                                        key={division}
                                        value={division}
                                    >
                                        {text.divisionNames[division]}
                                        {" — "}
                                        {text.divisionAges[division]}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="analytics-form-group">

                            <label htmlFor="strength-weight-class">
                                {text.weightClass}
                            </label>

                            <select
                                id="strength-weight-class"
                                value={form.weightClass}
                                onChange={(event) =>
                                    updateCategory(
                                        "weightClass",
                                        event.target.value
                                    )
                                }
                            >
                                {weightClasses.map((weightClass) => (
                                    <option
                                        key={weightClass}
                                        value={weightClass}
                                    >
                                        {weightClass} kg
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="analytics-form-group">

                            <label htmlFor="strength-squat">
                                {text.squat} (kg)
                            </label>

                            <input
                                id="strength-squat"
                                type="number"
                                min="0.5"
                                step="0.5"
                                inputMode="decimal"
                                placeholder="100"
                                value={form.squat}
                                onChange={(event) =>
                                    updateLift(
                                        "squat",
                                        event.target.value
                                    )
                                }
                                required
                            />
                        </div>

                        <div className="analytics-form-group">

                            <label htmlFor="strength-bench">
                                {text.bench} (kg)
                            </label>

                            <input
                                id="strength-bench"
                                type="number"
                                min="0.5"
                                step="0.5"
                                inputMode="decimal"
                                placeholder="55"
                                value={form.bench}
                                onChange={(event) =>
                                    updateLift(
                                        "bench",
                                        event.target.value
                                    )
                                }
                                required
                            />
                        </div>

                        <div className="analytics-form-group">

                            <label htmlFor="strength-deadlift">
                                {text.deadlift} (kg)
                            </label>

                            <input
                                id="strength-deadlift"
                                type="number"
                                min="0.5"
                                step="0.5"
                                inputMode="decimal"
                                placeholder="125"
                                value={form.deadlift}
                                onChange={(event) =>
                                    updateLift(
                                        "deadlift",
                                        event.target.value
                                    )
                                }
                                required
                            />
                        </div>

                    </div>

                    <p className="analytics-form-help">
                        {text.ageRule}
                    </p>

                    <div className="analytics-form-actions">

                        <button
                            className="analytics-primary-button"
                            type="submit"
                        >
                            {text.generate}
                        </button>

                        <button
                            className="analytics-secondary-button"
                            type="button"
                            onClick={resetForm}
                        >
                            {text.reset}
                        </button>

                    </div>

                    {error && (
                        <p
                            className="analytics-error-message"
                            role="alert"
                        >
                            {error}
                        </p>
                    )}

                </form>

                {comparison ? (
                    <StrengthResults
                        comparison={comparison}
                        language={language}
                        text={text}
                    />
                ) : (
                    <div className="analytics-empty-result">

                        <h2>
                            {text.emptyStrengthTitle}
                        </h2>

                        <p>
                            {text.emptyStrengthText}
                        </p>

                    </div>
                )}

            </div>

        </section>
    );
}


/************************************************
    STRENGTH RESULTS
************************************************/

function StrengthResults({
    comparison,
    language,
    text
}) {
    const userTotal =
        comparison.userValues.reduce(
            (sum, value) => sum + value,
            0
        );

    const recordSum =
        comparison.recordValues.reduce(
            (sum, value) => sum + value,
            0
        );

    const genderLabel =
        comparison.gender === "Men"
            ? text.men
            : text.women;

    const divisionLabel =
        text.divisionNames[comparison.division];

    const recordUrl =
        getOfficialRecordUrl(
            comparison.gender,
            comparison.division
        );

    function editInputs() {
        document
            .getElementById("strength-inputs")
            ?.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
    }

    return (
        <div id="strength-results">

            <div className="analytics-selection-bar">

                <div className="analytics-selection-chips">

                    <span className="analytics-selection-chip">
                        {genderLabel}
                    </span>

                    <span className="analytics-selection-chip">
                        {divisionLabel}
                    </span>

                    <span className="analytics-selection-chip">
                        {comparison.weightClass} kg
                    </span>

                    <span className="analytics-selection-chip record-chip">
                        Classic
                    </span>

                </div>

                <button
                    type="button"
                    className="analytics-edit-button"
                    onClick={editInputs}
                >
                    {text.editInputs}
                </button>

            </div>

            <div className="analytics-summary-grid">

                <article className="analytics-summary-card">

                    <p className="analytics-summary-label">
                        {text.selectedCategory}
                    </p>

                    <p className="analytics-summary-value">
                        {genderLabel}
                        <br />
                        {divisionLabel}
                        <br />
                        {comparison.weightClass} kg
                    </p>

                </article>

                <article className="analytics-summary-card">

                    <p className="analytics-summary-label">
                        {text.enteredTotal}
                    </p>

                    <p className="analytics-summary-value">
                        {formatNumber(userTotal, language)} kg
                    </p>

                </article>

                <article className="analytics-summary-card highlight-card">

                    <p className="analytics-summary-label">
                        {text.recordSum}
                    </p>

                    <p className="analytics-summary-value">
                        {formatNumber(recordSum, language)} kg
                    </p>

                    <p className="analytics-summary-note">
                        {text.recordSumNote}
                    </p>

                </article>

            </div>

            <article className="analytics-chart-panel">

                <div className="analytics-chart-header">

                    <div>
                        <h2 className="analytics-chart-title">
                            {text.strengthChartTitle}
                        </h2>

                        <p className="analytics-chart-description">
                            {text.strengthChartDescription}
                        </p>
                    </div>

                    <span className="analytics-chart-badge">
                        {text.classicRecords}
                    </span>

                </div>

                <StrengthLineChart
                    userValues={comparison.userValues}
                    recordValues={comparison.recordValues}
                    language={language}
                    text={text}
                />

                <StrengthComparisonTable
                    comparison={comparison}
                    language={language}
                    text={text}
                />

                <div className="analytics-chart-source">

                    <p className="analytics-source-text">
                        {text.recordSource}
                    </p>

                    <a
                        className="analytics-source-link"
                        href={recordUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {text.viewRecords}
                    </a>

                </div>

            </article>

        </div>
    );
}


/************************************************
    STRENGTH LINE CHART
************************************************/

function StrengthLineChart({
    userValues,
    recordValues,
    language,
    text
}) {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) {
            return undefined;
        }

        if (chartRef.current) {
            chartRef.current.destroy();
        }

        const context =
            canvasRef.current.getContext("2d");

        chartRef.current = new Chart(context, {
            type: "line",

            data: {
                labels: [
                    text.squat,
                    text.bench,
                    text.deadlift
                ],

                datasets: [
                    {
                        label: text.yourLifts,
                        data: userValues,
                        borderColor: "#0b0708",
                        backgroundColor: "#0b0708",
                        pointBackgroundColor: "#0b0708",
                        pointBorderColor: "#ffffff",
                        pointBorderWidth: 2,
                        pointRadius: 6,
                        pointHoverRadius: 8,
                        borderWidth: 4,
                        tension: 0,
                        fill: false
                    },

                    {
                        label: text.canadianRecords,
                        data: recordValues,
                        borderColor: "#c23035",
                        backgroundColor: "#c23035",
                        pointBackgroundColor: "#c23035",
                        pointBorderColor: "#ffffff",
                        pointBorderWidth: 2,
                        pointRadius: 6,
                        pointHoverRadius: 8,
                        borderWidth: 4,
                        tension: 0,
                        fill: false
                    }
                ]
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,

                interaction: {
                    mode: "index",
                    intersect: false
                },

                plugins: {
                    legend: {
                        position: "bottom",

                        labels: {
                            color: "#0b0708",
                            usePointStyle: true,
                            pointStyle: "circle",
                            padding: 25,

                            font: {
                                family: "Source Sans 3",
                                size: 14,
                                weight: "700"
                            }
                        }
                    },

                    tooltip: {
                        backgroundColor: "#0b0708",
                        titleColor: "#ffffff",
                        bodyColor: "#ffffff",
                        padding: 13,

                        callbacks: {
                            label(context) {
                                return (
                                    `${context.dataset.label}: ` +
                                    `${formatNumber(
                                        context.parsed.y,
                                        language
                                    )} kg`
                                );
                            }
                        }
                    }
                },

                scales: {
                    x: {
                        grid: {
                            display: false
                        },

                        ticks: {
                            color: "#0b0708",

                            font: {
                                family: "Source Sans 3",
                                size: 14,
                                weight: "800"
                            }
                        }
                    },

                    y: {
                        beginAtZero: true,

                        title: {
                            display: true,
                            text: text.weightLifted,
                            color: "#0b0708",

                            font: {
                                family: "Source Sans 3",
                                size: 14,
                                weight: "800"
                            }
                        },

                        ticks: {
                            color: "#0b0708",

                            callback(value) {
                                return `${value} kg`;
                            },

                            font: {
                                family: "Source Sans 3",
                                size: 13,
                                weight: "700"
                            }
                        },

                        grid: {
                            color: "rgba(11, 7, 8, 0.12)"
                        }
                    }
                }
            }
        });

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
                chartRef.current = null;
            }
        };

    }, [
        language,
        text,
        userValues[0],
        userValues[1],
        userValues[2],
        recordValues[0],
        recordValues[1],
        recordValues[2]
    ]);

    return (
        <div className="analytics-chart-container">

            <canvas
                ref={canvasRef}
                role="img"
                aria-label={text.strengthChartTitle}
            >
                {text.strengthChartDescription}
            </canvas>

        </div>
    );
}


/************************************************
    STRENGTH TABLE
************************************************/

function StrengthComparisonTable({
    comparison,
    language,
    text
}) {
    const rows = [
        {
            key: "squat",
            name: text.squat,
            user: comparison.userValues[0],
            record: comparison.recordValues[0]
        },

        {
            key: "bench",
            name: text.bench,
            user: comparison.userValues[1],
            record: comparison.recordValues[1]
        },

        {
            key: "deadlift",
            name: text.deadlift,
            user: comparison.userValues[2],
            record: comparison.recordValues[2]
        }
    ];

    return (
        <section className="analytics-table-section">

            <h3 className="analytics-table-title">
                {text.detailedComparison}
            </h3>

            <div className="analytics-table-wrapper">

                <table className="analytics-data-table">

                    <thead>
                        <tr>
                            <th scope="col">
                                {text.lift}
                            </th>

                            <th scope="col">
                                {text.yourResult}
                            </th>

                            <th
                                scope="col"
                                className="highlight-column"
                            >
                                {text.canadianRecord}
                            </th>

                            <th scope="col">
                                {text.remaining}
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {rows.map((row) => {
                            const difference =
                                row.record - row.user;

                            return (
                                <tr key={row.key}>

                                    <td>
                                        <span className="analytics-lift-name">
                                            {row.name}
                                        </span>
                                    </td>

                                    <td>
                                        {formatNumber(
                                            row.user,
                                            language
                                        )} kg
                                    </td>

                                    <td className="highlight-column">
                                        {formatNumber(
                                            row.record,
                                            language
                                        )} kg
                                    </td>

                                    <td>
                                        {difference <= 0 ? (
                                            <span className="analytics-record-met">
                                                {text.recordReached}
                                            </span>
                                        ) : (
                                            <span className="analytics-positive-gap">
                                                {formatNumber(
                                                    difference,
                                                    language
                                                )} kg
                                            </span>
                                        )}
                                    </td>

                                </tr>
                            );
                        })}
                    </tbody>

                </table>

            </div>

        </section>
    );
}


/************************************************
    NUTRITION PAGE
************************************************/

function NutritionPage({
    language,
    text
}) {
    const defaultForm = {
        gender: "Women",
        age: "",
        height: "",
        weight: "",
        activity: "1.55"
    };

    const balancedMacros = {
        carbs: 50,
        protein: 20,
        fat: 30
    };

    const [form, setForm] = useState(defaultForm);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    const [macroMode, setMacroMode] =
        useState("balanced");

    const [macroDraft, setMacroDraft] =
        useState(balancedMacros);

    const [appliedMacros, setAppliedMacros] =
        useState(balancedMacros);

    const macroTotal =
        macroDraft.carbs +
        macroDraft.protein +
        macroDraft.fat;

    const validMacroTotal =
        macroTotal === 100;


    function updateForm(field, value) {
        setForm((current) => ({
            ...current,
            [field]: value
        }));

        setError("");
    }


    function calculateNutrition(event) {
        event.preventDefault();

        const age = Number(form.age);
        const height = Number(form.height);
        const weight = Number(form.weight);
        const activity = Number(form.activity);

        const valid =
            Number.isFinite(age) &&
            age >= 19 &&
            Number.isFinite(height) &&
            height >= 100 &&
            Number.isFinite(weight) &&
            weight >= 30 &&
            Number.isFinite(activity);

        if (!valid) {
            setError(text.invalidNutrition);
            setResult(null);
            return;
        }

        const genderAdjustment =
            form.gender === "Men"
                ? 5
                : -161;

        const bmr =
            (10 * weight) +
            (6.25 * height) -
            (5 * age) +
            genderAdjustment;

        const maintenance =
            bmr * activity;

        const activityItem =
            activityLevels.find(
                (item) => item.value === activity
            );

        setResult({
            bmr,
            maintenance,
            activity,
            activityKey: activityItem?.key || "moderate"
        });

        setError("");

        window.setTimeout(() => {
            document
                .getElementById("nutrition-results")
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
        }, 100);
    }


    function resetNutrition() {
        setForm(defaultForm);
        setResult(null);
        setError("");
        setMacroMode("balanced");
        setMacroDraft(balancedMacros);
        setAppliedMacros(balancedMacros);
    }


    function useBalancedReference() {
        setMacroMode("balanced");
        setMacroDraft(balancedMacros);
        setAppliedMacros(balancedMacros);
    }


    function activateCustom() {
        setMacroMode("custom");
    }


    function updateMacro(field, value) {
        setMacroMode("custom");

        setMacroDraft((current) => ({
            ...current,
            [field]: Number(value)
        }));
    }


    function applyMacroDistribution() {
        if (!validMacroTotal) {
            return;
        }

        setAppliedMacros({
            ...macroDraft
        });
    }


    return (
        <section className="analytics-content-section">

            <div className="container">

                <div className="analytics-section-heading">

                    <h1 className="analytics-section-title">
                        {text.nutritionTitle}
                    </h1>

                    <p className="analytics-section-description">
                        {text.nutritionDescription}
                    </p>

                </div>

                <form
                    id="nutrition-inputs"
                    className="analytics-input-panel"
                    onSubmit={calculateNutrition}
                >

                    <h2 className="analytics-input-panel-title">
                        {text.nutritionInputTitle}
                    </h2>

                    <p className="analytics-input-panel-text">
                        {text.nutritionInputText}
                    </p>

                    <div className="analytics-form-grid">

                        <div className="analytics-form-group">

                            <label htmlFor="nutrition-gender">
                                {text.gender}
                            </label>

                            <select
                                id="nutrition-gender"
                                value={form.gender}
                                onChange={(event) =>
                                    updateForm(
                                        "gender",
                                        event.target.value
                                    )
                                }
                            >
                                <option value="Women">
                                    {text.women}
                                </option>

                                <option value="Men">
                                    {text.men}
                                </option>
                            </select>
                        </div>

                        <div className="analytics-form-group">

                            <label htmlFor="nutrition-age">
                                {text.age}
                            </label>

                            <input
                                id="nutrition-age"
                                type="number"
                                min="19"
                                max="100"
                                step="1"
                                placeholder="25"
                                value={form.age}
                                onChange={(event) =>
                                    updateForm(
                                        "age",
                                        event.target.value
                                    )
                                }
                                required
                            />
                        </div>

                        <div className="analytics-form-group">

                            <label htmlFor="nutrition-height">
                                {text.height} (cm)
                            </label>

                            <input
                                id="nutrition-height"
                                type="number"
                                min="100"
                                max="250"
                                step="0.1"
                                placeholder="160"
                                value={form.height}
                                onChange={(event) =>
                                    updateForm(
                                        "height",
                                        event.target.value
                                    )
                                }
                                required
                            />
                        </div>

                        <div className="analytics-form-group">

                            <label htmlFor="nutrition-weight">
                                {text.weight} (kg)
                            </label>

                            <input
                                id="nutrition-weight"
                                type="number"
                                min="30"
                                max="350"
                                step="0.1"
                                placeholder="58"
                                value={form.weight}
                                onChange={(event) =>
                                    updateForm(
                                        "weight",
                                        event.target.value
                                    )
                                }
                                required
                            />
                        </div>

                        <div className="analytics-form-group">

                            <label htmlFor="nutrition-activity">
                                {text.activityLevel}
                            </label>

                            <select
                                id="nutrition-activity"
                                value={form.activity}
                                onChange={(event) =>
                                    updateForm(
                                        "activity",
                                        event.target.value
                                    )
                                }
                            >
                                {activityLevels.map((item) => (
                                    <option
                                        key={item.key}
                                        value={item.value}
                                    >
                                        {
                                            text.activities[item.key].name
                                        }
                                        {" — "}
                                        {
                                            text.activities[item.key].note
                                        }
                                        {" ("}
                                        {item.value}
                                        {")"}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>

                    <p className="analytics-form-help">
                        {text.adultNote}
                    </p>

                    <div className="analytics-form-actions">

                        <button
                            className="analytics-primary-button"
                            type="submit"
                        >
                            {text.calculate}
                        </button>

                        <button
                            className="analytics-secondary-button"
                            type="button"
                            onClick={resetNutrition}
                        >
                            {text.reset}
                        </button>

                    </div>

                    {error && (
                        <p
                            className="analytics-error-message"
                            role="alert"
                        >
                            {error}
                        </p>
                    )}

                </form>

                {result ? (
                    <NutritionResults
                        result={result}
                        language={language}
                        text={text}
                        macroMode={macroMode}
                        macroDraft={macroDraft}
                        appliedMacros={appliedMacros}
                        macroTotal={macroTotal}
                        validMacroTotal={validMacroTotal}
                        useBalancedReference={useBalancedReference}
                        activateCustom={activateCustom}
                        updateMacro={updateMacro}
                        applyMacroDistribution={applyMacroDistribution}
                    />
                ) : (
                    <div className="analytics-empty-result">

                        <h2>
                            {text.emptyNutritionTitle}
                        </h2>

                        <p>
                            {text.emptyNutritionText}
                        </p>

                    </div>
                )}

            </div>

        </section>
    );
}


/************************************************
    NUTRITION RESULTS
************************************************/

function NutritionResults({
    result,
    language,
    text,
    macroMode,
    macroDraft,
    appliedMacros,
    macroTotal,
    validMacroTotal,
    useBalancedReference,
    activateCustom,
    updateMacro,
    applyMacroDistribution
}) {
    const activity =
        text.activities[result.activityKey];

    return (
        <div id="nutrition-results">

            <div className="analytics-summary-grid">

                <article className="analytics-summary-card">

                    <p className="analytics-summary-label">
                        {text.bmr}
                    </p>

                    <p className="analytics-summary-value">
                        {formatNumber(
                            Math.round(result.bmr),
                            language,
                            0
                        )} kcal/day
                    </p>

                    <p className="analytics-summary-note">
                        {text.bmrNote}
                    </p>

                </article>

                <article className="analytics-summary-card highlight-card">

                    <p className="analytics-summary-label">
                        {text.maintenance}
                    </p>

                    <p className="analytics-summary-value">
                        {formatNumber(
                            Math.round(result.maintenance),
                            language,
                            0
                        )} kcal/day
                    </p>

                    <p className="analytics-summary-note">
                        {text.maintenanceNote}
                    </p>

                </article>

                <article className="analytics-summary-card">

                    <p className="analytics-summary-label">
                        {text.selectedActivity}
                    </p>

                    <p className="analytics-summary-value">
                        {activity.name}
                    </p>

                    <p className="analytics-summary-note">
                        {activity.note}
                        <br />
                        {text.activityFactor}: {result.activity}
                    </p>

                </article>

            </div>

            <MacroControls
                text={text}
                macroMode={macroMode}
                macroDraft={macroDraft}
                macroTotal={macroTotal}
                validMacroTotal={validMacroTotal}
                useBalancedReference={useBalancedReference}
                activateCustom={activateCustom}
                updateMacro={updateMacro}
                applyMacroDistribution={applyMacroDistribution}
            />

            <article className="analytics-chart-panel">

                <div className="analytics-chart-header">

                    <div>
                        <h2 className="analytics-chart-title">
                            {text.nutritionChartTitle}
                        </h2>

                        <p className="analytics-chart-description">
                            {text.nutritionChartDescription}
                        </p>
                    </div>

                    <span className="analytics-chart-badge">
                        {text.currentDistribution}
                    </span>

                </div>

                <NutritionStackedChart
                    maintenance={result.maintenance}
                    macros={appliedMacros}
                    language={language}
                    text={text}
                />

                <NutritionTable
                    maintenance={result.maintenance}
                    macros={appliedMacros}
                    language={language}
                    text={text}
                />

            </article>

            <div className="analytics-disclaimer">
                {text.educationalDisclaimer}
            </div>

        </div>
    );
}


/************************************************
    MACRO CONTROLS
************************************************/

function MacroControls({
    text,
    macroMode,
    macroDraft,
    macroTotal,
    validMacroTotal,
    useBalancedReference,
    activateCustom,
    updateMacro,
    applyMacroDistribution
}) {
    return (
        <section className="macro-control-panel">

            <div className="macro-control-header">

                <h2 className="macro-control-title">
                    {text.macroTitle}
                </h2>

                <p className="macro-control-description">
                    {text.macroDescription}
                </p>

            </div>

            <div className="macro-mode-row">

                <button
                    type="button"
                    className={
                        `macro-mode-button ${
                            macroMode === "balanced"
                                ? "is-active"
                                : ""
                        }`
                    }
                    onClick={useBalancedReference}
                >
                    {text.balancedReference}
                </button>

                <button
                    type="button"
                    className={
                        `macro-mode-button ${
                            macroMode === "custom"
                                ? "is-active"
                                : ""
                        }`
                    }
                    onClick={activateCustom}
                >
                    {text.custom}
                </button>

            </div>

            <div className="macro-slider-grid">

                <MacroSlider
                    id="macro-carbs"
                    label={text.carbs}
                    value={macroDraft.carbs}
                    min={45}
                    max={65}
                    onChange={(value) =>
                        updateMacro("carbs", value)
                    }
                />

                <MacroSlider
                    id="macro-protein"
                    label={text.protein}
                    value={macroDraft.protein}
                    min={10}
                    max={35}
                    onChange={(value) =>
                        updateMacro("protein", value)
                    }
                />

                <MacroSlider
                    id="macro-fat"
                    label={text.fat}
                    value={macroDraft.fat}
                    min={20}
                    max={35}
                    onChange={(value) =>
                        updateMacro("fat", value)
                    }
                />

            </div>

            <p className="analytics-form-help">
                {text.macroReference}
            </p>

            <div className="macro-total-box">

                <div>
                    <p
                        className={
                            `macro-total-value ${
                                validMacroTotal
                                    ? ""
                                    : "is-invalid"
                            }`
                        }
                    >
                        {text.total}: {macroTotal}%
                    </p>

                    {!validMacroTotal && (
                        <p
                            className="macro-warning"
                            role="alert"
                        >
                            {text.macroInvalid}
                        </p>
                    )}
                </div>

                <button
                    type="button"
                    className="analytics-primary-button"
                    disabled={!validMacroTotal}
                    onClick={applyMacroDistribution}
                >
                    {text.applyDistribution}
                </button>

            </div>

        </section>
    );
}


function MacroSlider({
    id,
    label,
    value,
    min,
    max,
    onChange
}) {
    return (
        <div className="macro-slider-card">

            <label htmlFor={id}>
                <span>{label}</span>
                <strong>{value}%</strong>
            </label>

            <input
                id={id}
                type="range"
                min={min}
                max={max}
                step="1"
                value={value}
                onChange={(event) =>
                    onChange(event.target.value)
                }
            />

            <div className="macro-slider-range">
                <span>{min}%</span>
                <span>{max}%</span>
            </div>

        </div>
    );
}


/************************************************
    NUTRITION STACKED BAR CHART
************************************************/

function NutritionStackedChart({
    maintenance,
    macros,
    language,
    text
}) {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) {
            return undefined;
        }

        if (chartRef.current) {
            chartRef.current.destroy();
        }

        const context =
            canvasRef.current.getContext("2d");

        const datasets = [
            {
                label: text.carbs,
                nutrientKey: "carbs",
                percentage: macros.carbs,
                caloriesPerGram: 4,
                data: [macros.carbs],
                backgroundColor: "#c23035"
            },

            {
                label: text.protein,
                nutrientKey: "protein",
                percentage: macros.protein,
                caloriesPerGram: 4,
                data: [macros.protein],
                backgroundColor: "#0b0708"
            },

            {
                label: text.fat,
                nutrientKey: "fat",
                percentage: macros.fat,
                caloriesPerGram: 9,
                data: [macros.fat],
                backgroundColor: "#8a8a8a"
            }
        ];

        chartRef.current = new Chart(context, {
            type: "bar",

            data: {
                labels: [
                    text.dailyCalories
                ],

                datasets
            },

            options: {
                indexAxis: "y",
                responsive: true,
                maintainAspectRatio: false,

                interaction: {
                    mode: "nearest",
                    intersect: true
                },

                plugins: {
                    legend: {
                        position: "bottom",

                        labels: {
                            color: "#0b0708",
                            padding: 24,

                            font: {
                                family: "Source Sans 3",
                                size: 14,
                                weight: "700"
                            }
                        }
                    },

                    tooltip: {
                        backgroundColor: "#0b0708",
                        titleColor: "#ffffff",
                        bodyColor: "#ffffff",
                        padding: 13,

                        callbacks: {
                            label(context) {
                                const dataset =
                                    context.dataset;

                                const percentage =
                                    dataset.percentage;

                                const calories =
                                    maintenance *
                                    (percentage / 100);

                                const grams =
                                    calories /
                                    dataset.caloriesPerGram;

                                return (
                                    `${dataset.label}: ` +
                                    `${percentage}% · ` +
                                    `${formatNumber(
                                        Math.round(calories),
                                        language,
                                        0
                                    )} kcal · ` +
                                    `${formatNumber(
                                        Math.round(grams),
                                        language,
                                        0
                                    )} g`
                                );
                            }
                        }
                    }
                },

                scales: {
                    x: {
                        stacked: true,
                        min: 0,
                        max: 100,

                        ticks: {
                            color: "#0b0708",

                            callback(value) {
                                return `${value}%`;
                            },

                            font: {
                                family: "Source Sans 3",
                                size: 13,
                                weight: "700"
                            }
                        },

                        grid: {
                            color: "rgba(11, 7, 8, 0.12)"
                        }
                    },

                    y: {
                        stacked: true,

                        grid: {
                            display: false
                        },

                        ticks: {
                            color: "#0b0708",

                            font: {
                                family: "Source Sans 3",
                                size: 14,
                                weight: "800"
                            }
                        }
                    }
                }
            }
        });

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
                chartRef.current = null;
            }
        };

    }, [
        language,
        text,
        maintenance,
        macros.carbs,
        macros.protein,
        macros.fat
    ]);

    return (
        <div className="analytics-chart-container nutrition-chart-container">

            <canvas
                ref={canvasRef}
                role="img"
                aria-label={text.nutritionChartTitle}
            >
                {text.nutritionChartDescription}
            </canvas>

        </div>
    );
}


/************************************************
    NUTRITION TABLE
************************************************/

function NutritionTable({
    maintenance,
    macros,
    language,
    text
}) {
    const rows = [
        {
            key: "carbs",
            name: text.carbs,
            percentage: macros.carbs,
            caloriesPerGram: 4
        },

        {
            key: "protein",
            name: text.protein,
            percentage: macros.protein,
            caloriesPerGram: 4
        },

        {
            key: "fat",
            name: text.fat,
            percentage: macros.fat,
            caloriesPerGram: 9
        }
    ].map((item) => {
        const calories =
            maintenance *
            (item.percentage / 100);

        const grams =
            calories /
            item.caloriesPerGram;

        return {
            ...item,
            calories,
            grams
        };
    });

    return (
        <section className="analytics-table-section">

            <h3 className="analytics-table-title">
                {text.nutritionTable}
            </h3>

            <div className="analytics-table-wrapper">

                <table className="analytics-data-table">

                    <thead>
                        <tr>
                            <th scope="col">
                                {text.nutrient}
                            </th>

                            <th scope="col">
                                {text.distribution}
                            </th>

                            <th
                                scope="col"
                                className="highlight-column"
                            >
                                {text.calories}
                            </th>

                            <th scope="col">
                                {text.caloriesPerGram}
                            </th>

                            <th scope="col">
                                {text.estimatedAmount}
                            </th>
                        </tr>
                    </thead>

                    <tbody>

                        {rows.map((row) => (
                            <tr key={row.key}>

                                <td>
                                    <span className="analytics-nutrient-name">
                                        {row.name}
                                    </span>
                                </td>

                                <td>
                                    {row.percentage}%
                                </td>

                                <td className="highlight-column">
                                    {formatNumber(
                                        Math.round(row.calories),
                                        language,
                                        0
                                    )} kcal
                                </td>

                                <td>
                                    {row.caloriesPerGram} kcal/g
                                </td>

                                <td>
                                    {formatNumber(
                                        Math.round(row.grams),
                                        language,
                                        0
                                    )} g
                                </td>

                            </tr>
                        ))}

                        <tr className="table-total-row">

                            <td>
                                {text.total}
                            </td>

                            <td>
                                100%
                            </td>

                            <td className="highlight-column">
                                {formatNumber(
                                    Math.round(maintenance),
                                    language,
                                    0
                                )} kcal
                            </td>

                            <td>
                                —
                            </td>

                            <td>
                                —
                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

        </section>
    );
}


/************************************************
    RENDER APP
************************************************/

ReactDOM
    .createRoot(
        document.getElementById("analytics-root")
    )
    .render(<AnalyticsApp />);