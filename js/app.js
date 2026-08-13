import {
    registerFCM
}
from "../firebase/messaging.js";

import {
    registerUser,
    loginUser,
    watchAuthState
}
from "../firebase/auth.js";

import {
    savePreferencesToCloud,
    isUsernameAvailable,
    loadPreferencesFromCloud
}
from "../firebase/user.js";


// ==========================
// ELEMENTOS
// ==========================

const welcomeSection =
document.getElementById(
    "welcomeSection"
);

const authSection =
document.getElementById(
    "authSection"
);

const preferencesSection =
document.getElementById(
    "preferencesSection"
);

const startButton =
document.getElementById(
    "startButton"
);

const emailInput =
document.getElementById(
    "email"
);

const passwordInput =
document.getElementById(
    "password"
);

const confirmPasswordInput =
document.getElementById(
    "confirmPassword"
);

const registerButton =
document.getElementById(
    "registerButton"
);

const loginButton =
document.getElementById(
    "loginButton"
);

const passwordButton =
document.getElementById(
    "passwordButton"
);

const usernameInput =
document.getElementById(
    "username"
);

const languageSelect =
document.getElementById(
    "language"
);

const saveButton =
document.getElementById(
    "savePreferences"
);


// ==========================
// TRADUÇÕES
// ==========================

const translations = {

    "pt-BR": {

        title:
        "Retropixel Pulse™",

        subtitle:
        "Notícias rápidas para você.",

        welcome:
        "Bem-vindo(a) ao Pulse",

        welcomeDescription:
        "Receba notícias do seu gosto com facilidade e um visual retrô.",

        about:
        "📄 Sobre o Pulse™",

        aboutText:
        "Criado em 29/05/2026 pela Retropixel™, o Pulse™ é um web app de notícias personalizadas. Você cria uma conta, escolhe os temas e fontes das notícias que quer receber e pronto! As notícias já vão começar a aparecer para você. Todo dia, novas notícias aparecem, e nós escolhemos a forma mais retrô de fazer você recebê-las: RSS. Isso mesmo, RSS. Então, boa lida e obrigado por usar o Pulse™!",

        start:
        "➡ Começar",

        authTitle:
        "🔐 Entrar ou Criar Conta",

        authDescription:
        "Entre com sua conta ou crie uma nova para sincronizar suas preferências em qualquer dispositivo.",

        email:
        "📧 E-mail",

        password:
        "🔑 Senha",

        confirmPassword:
        "🔒 Confirmar Senha",

        emailPlaceholder:
        "Digite seu e-mail",

        passwordPlaceholder:
        "Digite sua senha",

        confirmPasswordPlaceholder:
        "Repita sua senha",

        register:
        "📝 Criar Conta",

        login:
        "🚪 Entrar",

        forgotPassword:
        "❓ Esqueceu a senha?",

        setupTitle:
        "🌎 Configuração Inicial",

        setupDescription:
        "Escolha suas preferências para receber notícias personalizadas.",

        username:
        "👤 Nome de Usuário",

        usernamePlaceholder:
        "Escolha um nome de usuário",

        language:
        "Idioma",

        themes:
        "Temas",

        sources:
        "Fontes",

        finish:
        "🚀 Entrar no Retropixel Pulse",

        languagePortuguese:
        "Português",

        languageEnglish:
        "English",

        languageSpanish:
        "Español",

        technologies:
        "Tecnologia",

        ai:
        "IA",

        games:
        "Games",

        roblox:
        "Roblox",

        programming:
        "Programação",

        science:
        "Ciência",

        space:
        "Espaço",

        movies:
        "Filmes",

        series:
        "Séries",

        music:
        "Música",

        sports:
        "Esportes",

        economy:
        "Economia",

        politics:
        "Política",

        digitalSecurity:
        "Segurança Digital",

        retroTech:
        "Retro Tech"

    },


    "en-US": {

        title:
        "Retropixel Pulse™",

        subtitle:
        "Fast news for you.",

        welcome:
        "Welcome to Pulse",

        welcomeDescription:
        "Get the news you like with ease and a retro look.",

        about:
        "📄 About Pulse™",

        aboutText:
        "Created on May 29, 2026 by Retropixel™, Pulse™ is a personalized news web app. You create an account, choose the topics and news sources you want, and you're ready to go! New stories will start appearing for you. Every day, new news appears, and we chose the most retro way to deliver it: RSS. That's right, RSS. Enjoy reading and thank you for using Pulse™!",

        start:
        "➡ Start",

        authTitle:
        "🔐 Sign In or Create Account",

        authDescription:
        "Sign in with your account or create a new one to sync your preferences across devices.",

        email:
        "📧 Email",

        password:
        "🔑 Password",

        confirmPassword:
        "🔒 Confirm Password",

        emailPlaceholder:
        "Enter your email",

        passwordPlaceholder:
        "Enter your password",

        confirmPasswordPlaceholder:
        "Repeat your password",

        register:
        "📝 Create Account",

        login:
        "🚪 Sign In",

        forgotPassword:
        "❓ Forgot your password?",

        setupTitle:
        "🌎 Initial Setup",

        setupDescription:
        "Choose your preferences to receive personalized news.",

        username:
        "👤 Username",

        usernamePlaceholder:
        "Choose a username",

        language:
        "Language",

        themes:
        "Topics",

        sources:
        "Sources",

        finish:
        "🚀 Enter Retropixel Pulse",

        languagePortuguese:
        "Português",

        languageEnglish:
        "English",

        languageSpanish:
        "Español",

        technologies:
        "Technology",

        ai:
        "AI",

        games:
        "Games",

        roblox:
        "Roblox",

        programming:
        "Programming",

        science:
        "Science",

        space:
        "Space",

        movies:
        "Movies",

        series:
        "Series",

        music:
        "Music",

        sports:
        "Sports",

        economy:
        "Economy",

        politics:
        "Politics",

        digitalSecurity:
        "Digital Security",

        retroTech:
        "Retro Tech"

    },


    "es-ES": {

        title:
        "Retropixel Pulse™",

        subtitle:
        "Noticias rápidas para ti.",

        welcome:
        "Bienvenido(a) a Pulse",

        welcomeDescription:
        "Recibe las noticias que te gustan con facilidad y un estilo retro.",

        about:
        "📄 Sobre Pulse™",

        aboutText:
        "Creado el 29/05/2026 por Retropixel™, Pulse™ es una aplicación web de noticias personalizadas. Creas una cuenta, eliges los temas y las fuentes de noticias que quieres y ¡listo! Las noticias comenzarán a aparecer para ti. Cada día aparecen nuevas noticias y elegimos la forma más retro de recibirlas: RSS. Así es, RSS. ¡Disfruta de la lectura y gracias por usar Pulse™!",

        start:
        "➡ Comenzar",

        authTitle:
        "🔐 Iniciar Sesión o Crear Cuenta",

        authDescription:
        "Inicia sesión con tu cuenta o crea una nueva para sincronizar tus preferencias en cualquier dispositivo.",

        email:
        "📧 Correo electrónico",

        password:
        "🔑 Contraseña",

        confirmPassword:
        "🔒 Confirmar Contraseña",

        emailPlaceholder:
        "Introduce tu correo electrónico",

        passwordPlaceholder:
        "Introduce tu contraseña",

        confirmPasswordPlaceholder:
        "Repite tu contraseña",

        register:
        "📝 Crear Cuenta",

        login:
        "🚪 Iniciar Sesión",

        forgotPassword:
        "❓ ¿Olvidaste tu contraseña?",

        setupTitle:
        "🌎 Configuración Inicial",

        setupDescription:
        "Elige tus preferencias para recibir noticias personalizadas.",

        username:
        "👤 Nombre de Usuario",

        usernamePlaceholder:
        "Elige un nombre de usuario",

        language:
        "Idioma",

        themes:
        "Temas",

        sources:
        "Fuentes",

        finish:
        "🚀 Entrar en Retropixel Pulse",

        languagePortuguese:
        "Português",

        languageEnglish:
        "English",

        languageSpanish:
        "Español",

        technologies:
        "Tecnología",

        ai:
        "IA",

        games:
        "Juegos",

        roblox:
        "Roblox",

        programming:
        "Programación",

        science:
        "Ciencia",

        space:
        "Espacio",

        movies:
        "Películas",

        series:
        "Series",

        music:
        "Música",

        sports:
        "Deportes",

        economy:
        "Economía",

        politics:
        "Política",

        digitalSecurity:
        "Seguridad Digital",

        retroTech:
        "Tecnología Retro"

    }

};


// ==========================
// MAPA DOS TEMAS
// ==========================

const themeKeys = {

    "Tecnologia":
    "technologies",

    "Technology":
    "technologies",

    "Tecnología":
    "technologies",

    "IA":
    "ai",

    "Games":
    "games",

    "Juegos":
    "games",

    "Roblox":
    "roblox",

    "Programação":
    "programming",

    "Programming":
    "programming",

    "Programación":
    "programming",

    "Ciência":
    "science",

    "Science":
    "science",

    "Ciencia":
    "science",

    "Espaço":
    "space",

    "Space":
    "space",

    "Espacio":
    "space",

    "Filmes":
    "movies",

    "Movies":
    "movies",

    "Películas":
    "movies",

    "Séries":
    "series",

    "Series":
    "series",

    "Música":
    "music",

    "Music":
    "music",

    "Esportes":
    "sports",

    "Sports":
    "sports",

    "Deportes":
    "sports",

    "Economia":
    "economy",

    "Economy":
    "economy",

    "Economía":
    "economy",

    "Política":
    "politics",

    "Politics":
    "politics",

    "Segurança Digital":
    "digitalSecurity",

    "Digital Security":
    "digitalSecurity",

    "Seguridad Digital":
    "digitalSecurity",

    "Retro Tech":
    "retroTech",

    "Tecnología Retro":
    "retroTech"

};


// ==========================
// FUNÇÃO DE TRADUÇÃO
// ==========================

function applyLanguage(
    language
){

    const t =
    translations[language] ||
    translations["pt-BR"];


    // TÍTULO

    document.title =
    t.title;


    // CABEÇALHO

    const headerTitle =
    document.querySelector(
        ".logo-area h1"
    );

    const headerSubtitle =
    document.querySelector(
        ".logo-area p"
    );

    if(headerTitle){
        headerTitle.textContent =
        t.title;
    }

    if(headerSubtitle){
        headerSubtitle.textContent =
        t.subtitle;
    }


    // BOAS-VINDAS

    if(welcomeSection){

        const title =
        welcomeSection.querySelector(
            "h2"
        );

        if(title){
            title.textContent =
            t.welcome;
        }

        const description =
        welcomeSection.querySelector(
            ".description"
        );

        if(description){
            description.textContent =
            t.welcomeDescription;
        }

        const aboutTitle =
        welcomeSection.querySelector(
            "section h3"
        );

        if(aboutTitle){
            aboutTitle.textContent =
            t.about;
        }

        const paragraphs =
        welcomeSection.querySelectorAll(
            "section .description"
        );

        if(paragraphs[0]){
            paragraphs[0].textContent =
            t.aboutText;
        }

        if(startButton){
            startButton.textContent =
            t.start;
        }

    }


    // LOGIN

    if(authSection){

        const title =
        authSection.querySelector(
            "h2"
        );

        if(title){
            title.textContent =
            t.authTitle;
        }

        const description =
        authSection.querySelector(
            ".description"
        );

        if(description){
            description.textContent =
            t.authDescription;
        }

        const headings =
        authSection.querySelectorAll(
            "section h3"
        );

        if(headings[0]){
            headings[0].textContent =
            t.email;
        }

        if(headings[1]){
            headings[1].textContent =
            t.password;
        }

        if(headings[2]){
            headings[2].textContent =
            t.confirmPassword;
        }

        if(emailInput){
            emailInput.placeholder =
            t.emailPlaceholder;
        }

        if(passwordInput){
            passwordInput.placeholder =
            t.passwordPlaceholder;
        }

        if(confirmPasswordInput){
            confirmPasswordInput.placeholder =
            t.confirmPasswordPlaceholder;
        }

        if(registerButton){
            registerButton.textContent =
            t.register;
        }

        if(loginButton){
            loginButton.textContent =
            t.login;
        }

        if(passwordButton){
            passwordButton.textContent =
            t.forgotPassword;
        }

    }


    // PREFERÊNCIAS

    if(preferencesSection){

        const title =
        preferencesSection.querySelector(
            "h2"
        );

        if(title){
            title.textContent =
            t.setupTitle;
        }

        const description =
        preferencesSection.querySelector(
            ".description"
        );

        if(description){
            description.textContent =
            t.setupDescription;
        }

        const headings =
        preferencesSection.querySelectorAll(
            "section h3"
        );

        if(headings[0]){
            headings[0].textContent =
            t.username;
        }

        if(headings[1]){
            headings[1].textContent =
            t.language;
        }

        if(headings[2]){
            headings[2].textContent =
            t.themes;
        }

        if(headings[3]){
            headings[3].textContent =
            t.sources;
        }

        if(usernameInput){
            usernameInput.placeholder =
            t.usernamePlaceholder;
        }

        if(saveButton){
            saveButton.textContent =
            t.finish;
        }

    }


    // IDIOMA

    if(languageSelect){

        const options =
        languageSelect.options;

        if(options[0]){
            options[0].textContent =
            t.languagePortuguese;
        }

        if(options[1]){
            options[1].textContent =
            t.languageEnglish;
        }

        if(options[2]){
            options[2].textContent =
            t.languageSpanish;
        }

    }


    // TEMAS

    if(preferencesSection){

        preferencesSection
        .querySelectorAll(
            ".chip"
        )
        .forEach(chip => {

            const key =
            themeKeys[
                chip.textContent.trim()
            ];

            if(
                key &&
                t[key]
            ){

                chip.textContent =
                t[key];

            }

        });

    }

}


// ==========================
// CARREGAR IDIOMA SALVO
// ==========================

function loadSavedLanguage(){

    const saved =
    localStorage.getItem(
        "pulseLanguage"
    );

    if(
        saved &&
        languageSelect
    ){

        languageSelect.value =
        saved;

        applyLanguage(
            saved
        );

    }
    else{

        applyLanguage(
            languageSelect
            ? languageSelect.value
            : "pt-BR"
        );

    }

}


// ==========================
// COMEÇAR
// ==========================

if(startButton){

    startButton.addEventListener(
        "click",
        () => {

            if(welcomeSection){
                welcomeSection.style.display =
                "none";
            }

            if(authSection){
                authSection.style.display =
                "block";
            }

        }
    );

}


// ==========================
// ESQUECEU A SENHA
// ==========================

if(passwordButton){

    passwordButton.addEventListener(
        "click",
        () => {

            window.location.href =
            "forgotpassword.html";

        }
    );

}


// ==========================
// ESTADO DE AUTENTICAÇÃO
// ==========================

watchAuthState(
    async user => {

        if(!user){

            if(welcomeSection){

                welcomeSection.style.display =
                "block";

            }

            if(authSection){

                authSection.style.display =
                "none";

            }

            if(preferencesSection){

                preferencesSection.style.display =
                "none";

            }

            return;

        }


        localStorage.setItem(
            "pulseUID",
            user.uid
        );


        try{

            const cloudPreferences =
            await loadPreferencesFromCloud();


            if(
                cloudPreferences &&
                cloudPreferences.username
            ){

                localStorage.setItem(

                    "retropixelPulsePreferences",

                    JSON.stringify(
                        cloudPreferences
                    )

                );

                localStorage.setItem(

                    "pulseUsername",

                    cloudPreferences.username

                );

                if(
                    cloudPreferences.language
                ){

                    localStorage.setItem(

                        "pulseLanguage",

                        cloudPreferences.language

                    );

                }

                window.location.href =
                "feed.html";

                return;

            }

        }
        catch(error){

            console.error(
                "Erro ao carregar preferências:",
                error
            );

        }


        if(welcomeSection){

            welcomeSection.style.display =
            "none";

        }

        if(authSection){

            authSection.style.display =
            "none";

        }

        if(preferencesSection){

            preferencesSection.style.display =
            "block";

        }


        loadSavedLanguage();

    }
);


// ==========================
// CRIAR CONTA
// ==========================

if(registerButton){

    registerButton.addEventListener(
        "click",
        async () => {

            const email =
            emailInput.value.trim();

            const password =
            passwordInput.value;

            const confirmPassword =
            confirmPasswordInput.value;


            if(email === ""){

                alert(
                    "Digite um e-mail."
                );

                return;

            }


            if(password.length < 6){

                alert(
                    "A senha deve ter pelo menos 6 caracteres."
                );

                return;

            }


            if(
                password !==
                confirmPassword
            ){

                alert(
                    "As senhas não coincidem."
                );

                return;

            }


            try{

                await registerUser(
                    email,
                    password
                );

                alert(
                    "Conta criada com sucesso!"
                );

            }
            catch(error){

                console.error(
                    error
                );

                alert(
                    error.message
                );

            }

        }
    );

}


// ==========================
// LOGIN
// ==========================

if(loginButton){

    loginButton.addEventListener(
        "click",
        async () => {

            const email =
            emailInput.value.trim();

            const password =
            passwordInput.value;


            if(
                email === "" ||
                password === ""
            ){

                alert(
                    "Preencha e-mail e senha."
                );

                return;

            }


            try{

                await loginUser(
                    email,
                    password
                );

            }
            catch(error){

                console.error(
                    error
                );

                alert(
                    "Falha ao entrar."
                );

            }

        }
    );

}


// ==========================
// SELEÇÃO DOS TEMAS
// ==========================

document
.querySelectorAll(
    ".chip"
)
.forEach(chip => {

    chip.addEventListener(
        "click",
        () => {

            chip.classList.toggle(
                "selected"
            );

        }
    );

});


// ==========================
// MUDANÇA DE IDIOMA
// ==========================

if(languageSelect){

    languageSelect.addEventListener(
        "change",
        () => {

            const language =
            languageSelect.value;

            localStorage.setItem(

                "pulseLanguage",

                language

            );

            applyLanguage(
                language
            );

        }
    );

}


// ==========================
// SALVAR PREFERÊNCIAS
// ==========================

if(saveButton){

    saveButton.addEventListener(
        "click",
        async () => {

            const username =
            usernameInput.value.trim();


            if(username === ""){

                alert(
                    "Escolha um nome de usuário."
                );

                return;

            }


            let available = false;


            try{

                available =
                await isUsernameAvailable(
                    username
                );

            }
            catch(error){

                console.error(
                    error
                );

                alert(
                    "Não foi possível verificar o nome de usuário."
                );

                return;

            }


            if(!available){

                alert(
                    "Este nome de usuário já está em uso."
                );

                return;

            }


            const selectedThemes = [];
            const selectedSources = [];


            const sourceNames = [

                "BBC",
                "CNN",
                "Reuters",
                "TechCrunch",
                "The Verge",
                "IGN",
                "Polygon",
                "g1",
                "Olhar Digital"

            ];


            document
            .querySelectorAll(
                ".chip.selected"
            )
            .forEach(chip => {

                const displayedText =
                chip.textContent.trim();

                const key =
                themeKeys[
                    displayedText
                ];


                if(
                    sourceNames.includes(
                        displayedText
                    )
                ){

                    selectedSources.push(
                        displayedText
                    );

                }
                else if(key){

                    selectedThemes.push(
                        key
                    );

                }

            });


            if(
                selectedThemes.length ===
                0
            ){

                alert(
                    "Escolha pelo menos um tema."
                );

                return;

            }


            if(
                selectedSources.length ===
                0
            ){

                alert(
                    "Escolha pelo menos uma fonte."
                );

                return;

            }


            const language =
            languageSelect.value;


            const preferences = {

                username,

                language,

                themes:
                selectedThemes,

                sources:
                selectedSources,

                notificationsEnabled:
                false,

                createdAt:
                new Date()
                .toISOString()

            };


            localStorage.setItem(

                "pulseUsername",

                username

            );


            localStorage.setItem(

                "pulseLanguage",

                language

            );


            localStorage.setItem(

                "retropixelPulsePreferences",

                JSON.stringify(
                    preferences
                )

            );


            try{

                await savePreferencesToCloud(
                    preferences
                );


                alert(
                    "Preferências salvas!"
                );


                window.location.href =
                "feed.html";

            }
            catch(error){

                console.error(
                    "Erro ao salvar preferências:",
                    error
                );


                alert(
                    "Erro ao salvar preferências."
                );

            }

        }
    );

}


// ==========================
// INICIALIZAÇÃO
// ==========================

loadSavedLanguage();


// ==========================
// SERVICE WORKER DO PWA
// ==========================

if(
    "serviceWorker" in navigator
){

    window.addEventListener(
        "load",
        async () => {

            try{

                await navigator.serviceWorker.register(
                    "./sw.js"
                );

                console.log(
                    "✅ Service Worker do PWA registrado."
                );

            }
            catch(error){

                console.error(
                    "❌ Erro ao registrar Service Worker:",
                    error
                );

            }

        }
    );

}
