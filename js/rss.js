// ==========================
// RETROPIXEL PULSE™
// RSS.JS
// ==========================


// ==========================
// FEEDS RSS
// ==========================

const RSS_FEEDS = {

    techcrunch:
    "https://techcrunch.com/feed/",

    verge:
    "https://www.theverge.com/rss/index.xml",

    polygon:
    "https://www.polygon.com/rss/index.xml",

    reuters:
    "https://feeds.reuters.com/reuters/technologyNews",

    bbc:
    "https://feeds.bbci.co.uk/news/technology/rss.xml"

};


// ==========================
// CONVERSOR RSS → JSON
// ==========================

const RSS_TO_JSON =
"https://api.rss2json.com/v1/api.json?rss_url=";


// ==========================
// BUSCAR UM FEED
// ==========================

export async function fetchRSSFeed(
    url
){

    try{

        const requestUrl =

        RSS_TO_JSON +

        encodeURIComponent(
            url
        ) +

        "&t=" +

        Date.now();


        const response =

        await fetch(
            requestUrl
        );


        if(
            !response.ok
        ){

            throw new Error(

                "HTTP " +
                response.status

            );

        }


        const data =
        await response.json();


        if(
            data.status &&
            data.status !== "ok"
        ){

            console.error(
                "RSS2JSON:",
                data.message || data
            );

            return [];

        }


        return data.items || [];

    }
    catch(error){

        console.error(
            "Erro RSS:",
            error
        );

        return [];

    }

}


// ==========================
// BUSCAR TODOS OS FEEDS
// ==========================

export async function fetchAllRSS(
    selectedSources = []
){

    let allNews = [];


    // ==========================
    // MAPA DE FONTES
    // ==========================

    const sourceMap = {

        "TechCrunch":
        RSS_FEEDS.techcrunch,

        "The Verge":
        RSS_FEEDS.verge,

        "Polygon":
        RSS_FEEDS.polygon,

        "Reuters":
        RSS_FEEDS.reuters,

        "BBC":
        RSS_FEEDS.bbc

    };


    // ==========================
    // FONTES SELECIONADAS
    // ==========================

    const feedsToLoad =

    selectedSources.length > 0

    ?

    selectedSources

    :

    Object.keys(
        sourceMap
    );


    // ==========================
    // CARREGAR FONTES
    // ==========================

    for(
        const source
        of
        feedsToLoad
    ){

        const feedUrl =
        sourceMap[source];


        if(!feedUrl){

            console.warn(
                "Fonte não encontrada:",
                source
            );

            continue;

        }


        const news =

        await fetchRSSFeed(
            feedUrl
        );


        news.forEach(
            item => {

                item.source =
                source;

            }
        );


        allNews =

        allNews.concat(
            news
        );

    }


    return allNews;

}
