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

        const cacheBuster =
        Date.now();

        const requestUrl =

        RSS_TO_JSON +

        encodeURIComponent(
            url
        ) +

        "&t=" +

        cacheBuster;


        const response =

        await fetch(

            requestUrl,

            {
                method:
                "GET",

                cache:
                "no-store",

                headers: {

                    "Cache-Control":
                    "no-cache",

                    "Pragma":
                    "no-cache"

                }

            }

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
                "Erro retornado pelo RSS2JSON:",
                data
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
    // FONTES ESCOLHIDAS
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
    // BUSCAR CADA FONTE
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


        try{

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
        catch(error){

            console.error(

                "Erro ao carregar " +
                source +
                ":",

                error

            );

        }

    }


    return allNews;

}
