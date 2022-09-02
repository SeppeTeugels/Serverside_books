//purpose of this file:
//being able to test frontend when server is not yet ready to deliver this content
//attention because add/edit/delete will not work
//set REACT_APP_USE_DUMMY_TEST_DATA=true in .env.development.local (do not commit)

const DUMMY_BOOKS = [
    {
        "id": 1,
        "title": "Oryx and Crake",
        "authors": [{"id": 1, "name": "Margaret Atwood"}],
    },
    {
        "id": 2,
        "title": "The year of the flood",
        "authors": [{"id": 1, "name": "Margaret Atwood"}],
    },
    {
        "id": 3,
        "title": "MaddAddam",
        "authors": [{"id": 1, "name": "Margaret Atwood"}],
    },
    {
        "id": 4,
        "title": "1Q84",
        "authors": [{"id": 2, "name": "Haruki Murakami"}],
    },
    {
        "id": 5,
        "title": "De opwindvogelkronieken",
        "authors": [{"id": 2, "name": "Haruki Murakami"}],
    },
    {
        "id": 6,
        "title": "Design Patterns",
        "authors": [
            {"id": 3, "name": "Erich Gamma"},
            {"id": 4, "name": "Richard Helm"},
            {"id": 5, "name": "Ralph Johnson"},
            {"id": 6, "name": "John Vlissides"}],
    },
    {
        "id": 7,
        "title": "The Handmaid's Tale",
        "authors": [{"id": 1, "name": "Margaret Atwood"}],
    },
];

const DUMMY_AUTHORS = [
    {"id": 1, "name": "Margaret Atwood"},
    {"id": 2, "name": "Haruki Murakami"},
    {"id": 3, "name": "Erich Gamma"},
    {"id": 4, "name": "Richard Helm"},
    {"id": 5, "name": "Ralph Johnson"},
    {"id": 6, "name": "John Vlissides"},
    {"id": 7, "name": "Kent Beck"}
];

const DUMMY_BOOKS_1 = {
    "id": 1,
    "title": "Oryx and Crake",
    "author": "Margaret Atwood",
    "authors": [{"id": 1, "name": "Margaret Atwood"}],
    "description": "MaddAddam is a serie of 3 dystopian science-fiction novels that deals with extreme genetic engineering.",
    "booksSameAuthors": [
        {
            "id": 2,
            "title": "The year of the flood",
            "authors": [{"id": 1, "name": "Margaret Atwood"}],
        }, {
            "id": 3,
            "title": "MaddAddam",
            "authors": [{"id": 1, "name": "Margaret Atwood"}],
        }, {
            "id": 7,
            "title": "The Handmaid's Tale",
            "authors": [{"id": 1, "name": "Margaret Atwood"}],
        }
    ],
    "serie": {"id": 1, "name": "MaddAddam"},
    "nrInSerie": 1,
    "booksSameSerie": [
        {
            "id": 2,
            "title": "The year of the flood",
            "authors": [{"id": 1, "name": "Margaret Atwood"}],
        }, {
            "id": 3,
            "title": "MaddAddam",
            "authors": [{"id": 1, "name": "Margaret Atwood"}],
        },
    ],
};

const DUMMY_BOOKS_2 = {
    "id": 2,
    "title": "The year of the flood",
    "authors": [{"id": 1, "name": "Margaret Atwood"}],
    "description": "MaddAddam is a serie of 3 dystopian science-fiction novels that deals with extreme genetic engineering.",
    "booksSameAuthors": [
        {
            "id": 1,
            "title": "Oryx and Crake",
            "authors": [{"id": 1, "name": "Margaret Atwood"}],
        }, {
            "id": 3,
            "title": "MaddAddam",
            "authors": [{"id": 1, "name": "Margaret Atwood"}],
        }, {
            "id": 7,
            "title": "The Handmaid's Tale",
            "authors": [{"id": 1, "name": "Margaret Atwood"}],
        }
    ],
    "serie": {"id": 1, "name": "MaddAddam"},
    "nrInSerie": 2,
    "booksSameSerie": [
        {
            "id": 1,
            "title": "Oryx and Crake",
            "authors": [{"id": 1, "name": "Margaret Atwood"}],
        }, {
            "id": 3,
            "title": "MaddAddam",
            "authors": [{"id": 1, "name": "Margaret Atwood"}],
        },
    ]
};

const DUMMY_BOOKS_3 = {
    "id": 3,
    "title": "MaddAddam",
    "authors": [{"id": 1, "name": "Margaret Atwood"}],
    "description": "MaddAddam is a serie of 3 dystopian science-fiction novels that deals with extreme genetic engineering.",
    "booksSameAuthors": [
        {
            "id": 1,
            "title": "Oryx and Crake",
            "authors": [{"id": 1, "name": "Margaret Atwood"}],
        }, {
            "id": 2,
            "title": "The year of the flood",
            "authors": [{"id": 1, "name": "Margaret Atwood"}],
        }, {
            "id": 7,
            "title": "The Handmaid's Tale",
            "authors": [{"id": 1, "name": "Margaret Atwood"}],
        }
    ],
    "serie": {"id": 1, "name": "MaddAddam"},
    "nrInSerie": 3,
    "booksSameSerie": [
        {
            "id": 1,
            "title": "Oryx and Crake",
            "authors": [{"id": 1, "name": "Margaret Atwood"}],
        }, {
            "id": 2,
            "title": "The year of the flood",
            "authors": [{"id": 1, "name": "Margaret Atwood"}],
        },
    ],
};

const DUMMY_BOOKS_4 = {
    "id": 4,
    "title": "1Q84",
    "authors": [{"id": 2, "name": "Haruki Murakami"}],
    "description": "Set in 1984 in Tokyo, the story concerns an assassin who stumbles upon an alternate world she refers to as 1Q84. There, she becomes embroiled in a conspiracy involving an abusive religious cult.",
    "booksSameAuthors": [
        {
            "id": 5,
            "title": "De opwindvogelkronieken",
            "authors": [{"id": 2, "name": "Haruki Murakami"}],
        },
    ],
};

const DUMMY_BOOKS_5 = {
    "id": 5,
    "title": "De opwindvogelkronieken",
    "authors": [{"id": 2, "name": "Haruki Murakami"}],
    "description": "Novel about Toru, a bored young man living a basic life in Tokyo. When Toru’s daily routines are interrupted by increasingly odd and chaotic events, he must undergo a metaphysical journey that tests the limits of free will and corporeality. ",
    "booksSameAuthors": [
        {
            "id": 4,
            "title": "1Q84",
            "authors": [{"id": 2, "name": "Haruki Murakami"}],
        },
    ],
};

const DUMMY_BOOKS_6 = {
    "id": 6,
    "title": "Design Patterns",
    "authors": [
        {"id": 3, "name": "Erich Gamma"},
        {"id": 4, "name": "Richard Helm"},
        {"id": 5, "name": "Ralph Johnson"},
        {"id": 6, "name": "John Vlissides"}],
    "description": "Capturing a wealth of experience about the design of object-oriented software, four top-notch designers present a catalog of simple and succinct solutions to commonly occurring design problems. ",
    "booksSameAuthors": [],
};

const DUMMY_BOOKS_7 = {
    "id": 7,
    "title": "The Handmaid's Tale",
    "authors": [{"id": 1, "name": "Margaret Atwood"}],
    "description": "Offred is a Handmaid in the Republic of Gilead. She may leave the home of the Commander and his wife once a day to walk to food markets whose signs are now pictures instead of words because women are no longer allowed to read. ",
    "booksSameAuthors": [
        {
            "id": 1,
            "title": "Oryx and Crake",
            "authors": [{"id": 1, "name": "Margaret Atwood"}],
        }, {
            "id": 2,
            "title": "The year of the flood",
            "authors": [{"id": 1, "name": "Margaret Atwood"}],
        }, {
            "id": 3,
            "title": "MaddAddam",
            "authors": [{"id": 1, "name": "Margaret Atwood"}],
        }
    ]
};

const DUMMY_AUTHOR_1 = {
    "id": 1,
    "name": "Margaret Atwood",
    "country": "Canada",
    description: "Margaret Atwood was born in 1939 in Ottawa and grew up in northern Ontario, Quebec, and Toronto. Throughout her writing career, Margaret Atwood has received numerous awards and honourary degrees.",
    books: [
        {
            "id": 1,
            "title": "Oryx and Crake",
            "authors": [{"id": 1, "name": "Margaret Atwood"}],
        }, {
            "id": 2,
            "title": "The year of the flood",
            "authors": [{"id": 1, "name": "Margaret Atwood"}],
        }, {
            "id": 3,
            "title": "MaddAddam",
            "authors": [{"id": 1, "name": "Margaret Atwood"}],
        }, {
            "id": 7,
            "title": "The Handmaid's Tale",
            "authors": [{"id": 1, "name": "Margaret Atwood"}],
        }
    ]
};
const DUMMY_AUTHOR_2 = {
    "id": 2,
    "name": "Haruki Murakami",
    "country":"Japan",
    description: "Haruki Murakami  is a popular contemporary Japanese writer and translator. His work has been described as 'easily accessible, yet profoundly complex'.",
    books: [
        {
            "id": 5,
            "title": "De opwindvogelkronieken",
            "authors": [{"id": 2, "name": "Haruki Murakami"}],
        }, {
            "id": 4,
            "title": "1Q84",
            "authors": [{"id": 2, "name": "Haruki Murakami"}],
        },
    ]
};
const DUMMY_AUTHOR_3 = {
    "id": 3,
    "name": "Erich Gamma",
    description: "",
    books: [
        {
            "id": 6,
            "title": "Design Patterns",
            "authors": [
                {"id": 3, "name": "Erich Gamma"},
                {"id": 4, "name": "Richard Helm"},
                {"id": 5, "name": "Ralph Johnson"},
                {"id": 6, "name": "John Vlissides"}],
        },
    ]
};
const DUMMY_AUTHOR_4 = {
    "id": 4,
    "name": "Richard Helm",
    description: "",
    books: [
        {
            "id": 6,
            "title": "Design Patterns",
            "authors": [
                {"id": 3, "name": "Erich Gamma"},
                {"id": 4, "name": "Richard Helm"},
                {"id": 5, "name": "Ralph Johnson"},
                {"id": 6, "name": "John Vlissides"}],
        },
    ]
};
const DUMMY_AUTHOR_5 = {
    "id": 5,
    "name": "Ralph Johnson",
    description: "",
    books: [
        {
            "id": 6,
            "title": "Design Patterns",
            "authors": [
                {"id": 3, "name": "Erich Gamma"},
                {"id": 4, "name": "Richard Helm"},
                {"id": 5, "name": "Ralph Johnson"},
                {"id": 6, "name": "John Vlissides"}],
        },
    ]
};
const DUMMY_AUTHOR_6 = {
    "id": 6,
    "name": "John Vlissides",
    description: "",
    books: [
        {
            "id": 6,
            "title": "Design Patterns",
            "authors": [
                {"id": 3, "name": "Erich Gamma"},
                {"id": 4, "name": "Richard Helm"},
                {"id": 5, "name": "Ralph Johnson"},
                {"id": 6, "name": "John Vlissides"}],
        },
    ]
};
const DUMMY_AUTHOR_7 = {
    "id": 7,
    "name": "Kent Beck",
    description: "",
    books: [
    ]
};

const DUMMY_DATA_MAP = {
    "/api/books": DUMMY_BOOKS,
    "/api/authors": DUMMY_AUTHORS,
    "/api/books/1": DUMMY_BOOKS_1,
    "/api/books/2": DUMMY_BOOKS_2,
    "/api/books/3": DUMMY_BOOKS_3,
    "/api/books/4": DUMMY_BOOKS_4,
    "/api/books/5": DUMMY_BOOKS_5,
    "/api/books/6": DUMMY_BOOKS_6,
    "/api/books/7": DUMMY_BOOKS_7,
    "/api/authors/1": DUMMY_AUTHOR_1,
    "/api/authors/2": DUMMY_AUTHOR_2,
    "/api/authors/3": DUMMY_AUTHOR_3,
    "/api/authors/4": DUMMY_AUTHOR_4,
    "/api/authors/5": DUMMY_AUTHOR_5,
    "/api/authors/6": DUMMY_AUTHOR_6,
    "/api/authors/7": DUMMY_AUTHOR_7,
};


export function dummyData(url) {
    const useDummyData = process.env.REACT_APP_USE_DUMMY_TEST_DATA === "true";
    const dummyData = useDummyData && DUMMY_DATA_MAP[url];
    if (dummyData) console.log(`Use DUMMY data for url ${url}`);
    return dummyData;
}