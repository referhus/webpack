import Vue from 'vue'

function isEmptyObject(obj) {
    for (let i in obj) {
        if (obj.hasOwnProperty(i))
            return false;
    }
    return true;
}

export default {
    namespaced: true,
    state: {
        defaultText: {
            header: {},
            footer: {},
            load: {},
            callback: {},
            banner: {},
            createDialog: {},
            addNewUsersDialog: {},
            addNewUsersLink: {},
            renameDialog:{},
            removeDialog: {},
            leaveDialog: {},
            invite: {},
            signUp: {},
            promo: {},
            auth: {},
            registration: {},
            passwordReset: {},
            search: {},
            select: {},
            topics: {},
            minuteArr: [],
            monthArr: [],
            weekArr: [],
            hoursArr: [],
            minuteTextArr: [],
            classCountArr: [],
            lessonsCountArr: [],
            reviewsCountArr: [],
            courseTypeArr: [],
            fileArr: [],
            reportsText: {},
            cookiesText: {}
        },
        coursesList: {},
        popularTeachers: {},
        lessonText: {},
        calendarText: {},
        reviewText: {},
        balanceText: {},
        transactionsText: {},
        dialogText: {},
        commentsText: {},
        documentsText: {}
    },
    getters: {
        header(state){
            return state.defaultText.header;
        },
        footer(state){
            return state.defaultText.footer;
        },
        load(state){
            return state.defaultText.load;
        },
        callback(state){
            return state.defaultText.callback;
        },
        banner(state){
            return state.defaultText.banner;
        },
        createDialog(state){
            return state.defaultText.createDialog;
        },
        addNewUsersDialog(state){
            return state.defaultText.addNewUsersDialog;
        },
        addNewUsersLink(state){
            return state.defaultText.addNewUsersLink;
        },
        renameDialog(state){
            return state.defaultText.renameDialog
        },
        removeDialog(state){
            return state.defaultText.removeDialog;
        },
        leaveDialog(state){
            return state.defaultText.leaveDialog;
        },
        report(state){
            return state.defaultText.report;
        },
        invite(state){
            return state.defaultText.invite;
        },
        signUp(state){
            return state.defaultText.signUp;
        },
        promo(state){
            return state.defaultText.promo;
        },
        auth(state){
            return state.defaultText.auth;
        },
        registration(state){
            return state.defaultText.registration;
        },
        passwordReset(state){
            return state.defaultText.passwordReset;
        },
        search(state){
            return state.defaultText.search;
        },
        select(state){
            return state.defaultText.select;
        },
        topics(state){
            return state.defaultText.topics;
        },
        monthArr(state){
            return state.defaultText.monthArr;
        },
        weekArr(state){
            return state.defaultText.weekArr;
        },
        hoursArr(state){
            return state.defaultText.hoursArr;
        },
        minuteArr(state){
            return state.defaultText.minuteArr;
        },
        classCountArr(state){
            return state.defaultText.classCountArr;
        },
        lessonsCountArr(state){
            return state.defaultText.lessonsCountArr;
        },
        reviewsCountArr(state){
            return state.defaultText.reviewsCountArr;
        },
        courseTypeArr(state){
            return state.defaultText.courseTypeArr;
        },
        fileArr(state){
            return state.defaultText.fileArr;
        },
        cookiesText(state){
            return state.defaultText.cookiesText;
        },
        coursesList(state){
            return state.coursesList;
        },
        popularTeachers(state){
            return state.popularTeachers;
        },
        lessonText(state){
            return state.lessonText;
        },
        reviewText(state){
            return state.reviewText;
        },
        balanceText(state){
            return state.balanceText;
        },
        transactionsText(state){
            return state.transactionsText
        },
        dialogText(state){
            return state.dialogText;
        },
        commentsText(state){
            return state.commentsText;
        },
        documentsText(state){
            return state.documentsText;
        }
    },
    mutations: {
        ClearDefault(state){
            for(let key in state.defaultText)
                state.defaultText[key] = {};
        },
        SetDefaultText(state, data){
            for(let key in data)
                state.defaultText[key] = data[key];
        },
        SetCoursesListText(state, data){
            state.coursesList = data;
        },
        SetPopularTeachersText(state, data){
            state.popularTeachers = data;
        },
        SetLessonText(state, data){
            state.lessonText = data;
        },
        SetReviewText(state,data){
            state.reviewText = data;
        },
        SetBalanceText(state,data){
            state.balanceText = data;
        },
        SetTransactionsText(state,data){
            state.transactionsText = data;
        },
        SetDialogText(state,data){
            state.dialogText = data;
        },
        SetCommentsText(state,data){
            state.commentsText = data;
        },
        SetDocumentsText(state, data){
            state.documentsText = data;
        }
    },
    actions: {
        LoadPageText ({commit}, data){
            if(process.env.NODE_ENV !== 'production'){
                return new Promise((resolve, reject) => {
                    Vue.http.get(data.url)
                        .then(response => response.json())
                        .then(data => {
                            resolve(data);
                        })
                })
            } else{
                return new Promise((resolve, reject) => {
                    Vue.http.post(data.url, data.main)
                        .then(response => response.json())
                        .then(data => {
                            resolve(data);
                        })
                })
            }
        },
        ClearDefault ({commit}){
            commit('ClearDefault');
        },
        LoadDefaultText ({commit}){
            if(isEmptyObject(this.state.staticText.defaultText.header)){
                if(process.env.NODE_ENV !== 'production'){
                    return new Promise((resolve, reject) => {
                        Vue.http.get('staticText/default.json')
                            .then(response => response.json())
                            .then(data => {
                                commit('SetDefaultText' ,data);
                                resolve();
                            })
                    })
                } else{
                    return new Promise((resolve, reject) => {
                        Vue.http.post('staticText', defaultText)
                            .then(response => response.json())
                            .then(data => {
                                commit('SetDefaultText' ,data);
                                resolve();
                            })
                    })
                }
            }
        },
        LoadTabsText ({commit}, data){
            if(process.env.NODE_ENV !== 'production'){
                return new Promise((resolve, reject) => {
                    Vue.http.get(data.url)
                        .then(response => response.json())
                        .then(data => {
                            resolve(data);
                        })
                })
            } else{
                return new Promise((resolve, reject) => {
                    Vue.http.post(data.url, data.tabs)
                        .then(response => response.json())
                        .then(data => {
                            resolve(data);
                        })
                })
            }
        },
        LoadCoursesListText ({commit}){
            if(process.env.NODE_ENV !== 'production'){
                return new Promise((resolve, reject) => {
                    Vue.http.get('staticText/coursesList.json')
                        .then(response => response.json())
                        .then(data => {
                            commit('SetCoursesListText' ,data);
                            resolve();
                        })
                })
            } else{
                return new Promise((resolve, reject) => {
                    Vue.http.post('staticText', coursesList)
                        .then(response => response.json())
                        .then(data => {
                            commit('SetCoursesListText' ,data);
                            resolve();
                        })
                })
            }
        },
        LoadPopularTeachersText ({commit}){
            if(process.env.NODE_ENV !== 'production'){
                return new Promise((resolve, reject) => {
                    Vue.http.get('staticText/popularTeachers.json')
                        .then(response => response.json())
                        .then(data => {
                            commit('SetPopularTeachersText' ,data);
                            resolve();
                        })
                })
            } else{
                return new Promise((resolve, reject) => {
                    Vue.http.post('staticText', popularTeachers)
                        .then(response => response.json())
                        .then(data => {
                            commit('SetPopularTeachersText' ,data);
                            resolve();
                        })
                })
            }
        },
        LoadLessonText ({commit}){
            if(process.env.NODE_ENV !== 'production'){
                return new Promise((resolve, reject) => {
                    Vue.http.get('staticText/lessonText.json')
                        .then(response => response.json())
                        .then(data => {
                            commit('SetLessonText' ,data);
                            resolve();
                        })
                })
            } else{
                return new Promise((resolve, reject) => {
                    Vue.http.post('staticText', lessonText)
                        .then(response => response.json())
                        .then(data => {
                            commit('SetLessonText' ,data);
                            resolve();
                        })
                })
            }
        },
        LoadReviewText ({commit}){
            if(process.env.NODE_ENV !== 'production'){
                return new Promise((resolve, reject) => {
                    Vue.http.get('staticText/reviewText.json')
                        .then(response => response.json())
                        .then(data => {
                            commit('SetReviewText' ,data);
                            resolve();
                        })
                })
            } else{
                return new Promise((resolve, reject) => {
                    Vue.http.post('staticText', reviewText)
                        .then(response => response.json())
                        .then(data => {
                            commit('SetReviewText' ,data);
                            resolve();
                        })
                })
            }
        },
        LoadBalanceText ({commit}){
            if(process.env.NODE_ENV !== 'production'){
                return new Promise((resolve, reject) => {
                    Vue.http.get('staticText/balanceText.json')
                        .then(response => response.json())
                        .then(data => {
                            commit('SetBalanceText' ,data);
                            resolve();
                        })
                })
            } else{
                return new Promise((resolve, reject) => {
                    Vue.http.post('staticText', balanceText)
                        .then(response => response.json())
                        .then(data => {
                            commit('SetBalanceText' ,data);
                            resolve();
                        })
                })
            }
        },
        LoadTransactionsText ({commit}){
            if(process.env.NODE_ENV !== 'production'){
                return new Promise((resolve, reject) => {
                    Vue.http.get('staticText/transactionsText.json')
                        .then(response => response.json())
                        .then(data => {
                            commit('SetTransactionsText' ,data);
                            resolve();
                        })
                })
            } else{
                return new Promise((resolve, reject) => {
                    Vue.http.post('staticText', transactionsText)
                        .then(response => response.json())
                        .then(data => {
                            commit('SetTransactionsText' ,data);
                            resolve();
                        })
                })
            }
        },
        LoadDialogText ({commit}){
            if(process.env.NODE_ENV !== 'production'){
                return new Promise((resolve, reject) => {
                    Vue.http.get('staticText/dialogText.json')
                        .then(response => response.json())
                        .then(data => {
                            commit('SetDialogText' ,data);
                            resolve();
                        })
                })
            } else{
                return new Promise((resolve, reject) => {
                    Vue.http.post('staticText', dialogText)
                        .then(response => response.json())
                        .then(data => {
                            commit('SetDialogText' ,data);
                            resolve();
                        })
                })
            }
        },
        LoadCommentsText ({commit}){
            if(process.env.NODE_ENV !== 'production'){
                return new Promise((resolve, reject) => {
                    Vue.http.get('staticText/commentsText.json')
                        .then(response => response.json())
                        .then(data => {
                            commit('SetCommentsText' ,data);
                            resolve();
                        })
                })
            } else{
                return new Promise((resolve, reject) => {
                    Vue.http.post('staticText', commentsText)
                        .then(response => response.json())
                        .then(data => {
                            commit('SetCommentsText' ,data);
                            resolve();
                        })
                })
            }
        },
        LoadDocumentsText ({commit}){
            if(process.env.NODE_ENV !== 'production'){
                return new Promise((resolve, reject) => {
                    Vue.http.get('staticText/docPage.json')
                        .then(response => response.json())
                        .then(data => {
                            commit('SetDocumentsText' ,data);
                            resolve();
                        })
                })
            } else{
                return new Promise((resolve, reject) => {
                    Vue.http.post('staticText', documentsText)
                        .then(response => response.json())
                        .then(data => {
                            commit('SetDocumentsText' ,data);
                            resolve();
                        })
                })
            }
        }
    }
};

let defaultText = {
    header: {
        logo: "Эй, Ньютон!",
        logoSub: "Онлайн-уроки на все случаи жизни",
        create: "Создать урок",
        registration: "Регистрация",
        auth: "Вход",
        menu_1: "Личный кабинет",
        menu_2: "Я учу",
        menu_3: "Я учусь",
        menu_4: "Финансы",
        menu_5: "Документы",
        menu_6: "Мои данные",
        menu_7: "Настройки",
        menu_8: "Выход",
        menu_9: "Уроки, курсы и консультации",
        menu_10: "О сервисе",
        menu_11: "Статьи",
        menu_12: "Частые вопросы",
        menu_13: "Контакты",
        menu_14: "Черный список"
    },
    footer: {
        menu_1: "О сервисе",
        menu_2: "Правила сервиса",
        menu_3: "Частые вопросы",
        menu_4: "Контакты",
        copyright: "Эй, Ньютон!"
    },
    load: {
        title: "Эй, Ньютон!",
        load: "Загрузка"
    },
    callback: {
        title: "Обратная связь",
        textTitle: "Ваше сообщение",
        emailTitle: "Электронная почта",
        emailHint: "Мы пришлём ответ на указанный адрес",
        personalData_1: "Я согласен с",
        personalData_2: "правилами обработки персональных данных",
        personalData_3: "и",
        personalData_4: "пользовательским соглашением",
        btn: "Отправить",
        msgSuccess: "Ваше сообщение отправлено администратору"
    },
    banner:{
        title: "Заказать рекламу",
        text: "Текст формы заказа рекламы",
        type: "Тип рекламы",
        typePlaceholder: "Выберите из списка",
        link: "Ссылка на рекламный материал",
        linkPlaceholder: "Введите ссылку",
        file: "Загрузите изображение баннера",
        fileSub: "Рекомендации по избражению баннера",
        filePlaceholder: "Загрузить изображение",
        comment: "Комментарий",
        commentPlaceholder: "Начните вводить",
        btn: "Заказать",
        cancell: "Отмена",
        msgSuccess: "Ваша заявка отправлена администратору, вы можете уточнить всю информацию в диалоге с тех поддержкой",
        msgError: "Произошел сбой сервера"
    },
    createDialog: {
        title: "Новый групповой чат",
        inputTitle_1: "Введите название чата",
        inputTitle_2: "Добавьте участников по ссылке",
        inputTitle_3: "Добавьте участников из контактов",
        btn: "Создать групповой чат",
        // msgSuccess: "Ваше сообщение отправлено администратору"
    },
    addNewUsersDialog: {
        title: "Участники чата",
        btn: "Сохранить",
        // msgSuccess: "Ваше сообщение отправлено администратору"
    },
    addNewUsersLink: {
        title: "Добавьте участников по ссылке",
        errorMsg: "Пользователь по этому URL не найден"
    },
    renameDialog: {
        title: "Переименовать чат",
        inputTitle_1: "Новое название",
        btn: "Переименовать",
        msgSuccess: "Диалог успешно переименовaн"
    },
    removeDialog: {
        title: "Удалить групповой чат",
        text: "Вы уверены, что хотите удалить чат",
        btnChancel: "Отмена",
        btn: "Удалить",
        msgSuccess: "Диалог успешно удален"
    },
    leaveDialog: {
        title: "Покинуть групповой чат",
        text: "Вы уверены, что хотите покинуть чат",
        btnChancel: "Отмена",
        btn: "Покинуть",
        msgSuccess: "Вы успешно поинули диалог"
    },
    report: {
        title: 'Сообщить о нарушениях',
        textTitle: 'Ваше сообщение',
        buttonTitle: 'Отправить',
        personalData_1: "Я согласен с",
        personalData_2: "правилами обработки персональных данных",
        personalData_3: "и",
        personalData_4: "пользовательским соглашением",
        msgSuccess: "Ваше сообщение отправлено администратору"
    },
    invite: {
        title: "Пригласи друга",
        textTitle: "Сообщение",
        emailTitle: "Электронная почта друга",
        emailHint: "Мы пришлём ответ на указанный адрес",
        personalData_1: "Я согласен с",
        personalData_2: "правилами обработки персональных данных",
        personalData_3: "и",
        personalData_4: "пользовательским соглашением",
        btn: "Отправить",
        dateBtn: "Изменить дату и время",
        msgSuccess: "Приглашение отправлено"
    },
    signUp: {
        enrollTitle: "Запись на урок",
        firstLesson: "Первый урок в",
        enrollBtn: "Записаться за",
        setNewDate: "Выбрать другую дату",
        msgSetTime: "Выберите время",
        applicationSubmitted: "Заявка отправлена. Ожидайте подтверждение учителя."
    },
    promo: {
        title: "Активировать код",
        label: "Введите код",
        btn: "Активировать",
        msg: "Код активирован"
    },
    auth: {
        title: "Вход",
        passwordReset: "Восстановить пароль",
        signIn: "Войти",
        registration: "Перейти к регистрации",
        email: "Электронная почта",
        password: "Пароль"
    },
    registration: {
        title: "Регистрация",
        personalData_1: "Я согласен с",
        personalData_2: "правилами обработки персональных данных",
        personalData_3: ", ",
        personalData_4: "пользовательским соглашением",
        personalData_5: "и",
        personalData_6: "договором оферты",
        notActivated: 'на данный email уже было отправлено письмо',
        notActivatedBtn: 'Отправить повторное письмо',
        registration: "Зарегистрироваться",
        auth: "Перейти ко входу",
        email: "Электронная почта",
        password: "Пароль",
        passwordPlaceholder: "Не менее 8 символов",
        passwordError: "Пароль должен содержать минимум 8 символов и состоять только из латинских букв, цифр и символа подчеркивания"
    },
    passwordReset: {
        title: "Сброс пароля",
        hint: "Укажите адрес на который зарегистрирован аккаунт — мы вышлем письмо с инструкцией",
        btnOk: "Начать восстановление",
        btnCancel: "Вернуться ко входу",
        email: "Электронная почта",
        msg: "На вашу почту отправлено письмо с инструкциями"
    },
    search: {
        filterTitle: "Фильтр",
        filterBtn: "Применить фильтр",
        filterClear: "Показывать всё",
        sort_1: "по дате",
        sort_2: "по популярности",
        sort_3: "по цене",
        sort_4: "сортировать по дате",
        sort_5: "популярности",
        sort_6: "цене",
        searchPlaceholderFull: "Найдите интересующие курсы и темы",
        searchPlaceholder: "Подготовка к ЕГЭ, игра на гитаре, английский...",
        searchPlaceholderTransactions: "Поиск по дате или сумме",
        transactionsTitle: "Показывать транзакции",
        transactions_1: "По оплате",
        transactions_2: "Выводу",
        transactions_3: "Пополнению",
        coursesTitle: "Показывать",
        courses_1: "Все уроки и курсы",
        courses_2: "Созданные мной",
        courses_3: "С моими заявками",
        fieldKnowledge: "Интересующие области знаний",
        interestingTopics: "Интересующие темы"
    },
    select: {
        empty: "Не указано",
        search: "Поиск",
        searchNot: "Не найдено совпадений",
        add: "Добавить как новую",
        hint: "Потребуется одобрение администратором сайта — до этого момента новое значение не будет использоваться при поиске и фильтрации."
    },
    topics: {
        empty: "Не указано",
        title: "Выберите темы",
        addNew: "Добавить новую тему",
        yes: "ОК", 
        no: "Отмена"
    },
    monthArr: ["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"],
    weekArr: ["воскресенье", "понедельник","вторник","среда","четверг","пятница","суббота"],
    hoursArr: ["час", "часа", "часов"],
    minuteArr: ["минута", "минуты", "минут"],
    classCountArr: ["занятие", "занятия", "занятий"],
    lessonsCountArr: ['урок', 'урока', 'уроков'],
    reviewsCountArr: ["отзыв", "отзыва", "отзывов"],
    courseTypeArr: ["Урок", "Консультация", "Курс"],
    fileArr: ["файл", "файла", "файлов"],
    cookiesText: {
        text: "Продолжая использовать наш сайт, вы даете согласие на обработку файлов cookie, которые обеспечивают правильную работу сайта. Благодаря им сайт работает, а мы улучшаем сервис.",
        btnOk: "Согласен",
        btnMore: "Подробнее"
    }
};

let coursesList = {
    title: "Популярные уроки, курсы и консультации",
    all: "Смотреть все"
};

let popularTeachers = {
    title: "Популярные учителя"
};

let lessonText = {
    setDate: "Записаться",
    edit: "Редактировать",
    addReview: "Оставить оценку",
    cancel: "Отменить запись",
    state: ["Вы подали заявку <span>Ждёт подтверждения учителя</span>", "Вы записаны", "Урок окончен"],
    msg: "Запись отменена"
};

let reviewText = {
    title_1: "Отзыв",
    title_2: "Претензия",
    title_3: "скрыт",
    open: "Читать подробнее",
    close: "Скрыть",
    claimTrue: "Согласен",
    claimFalse: "Не согласен",
    msg: "Ответ отправлен",
    msg2: "Отзыв отправлен",
    select: "Выберите оценку",
    placeholder: "Оставить отзыв",
    btnOk: "Отправить",
    cancel: "Отмена",
    cause: ["Урок состоялс", "Я пропустил урок", "Учитель пропустил урок", "Другое"]
};

let balanceText = {
    title: "Баланс",
    add: "Пополнить счёт",
    get: "Запросить вывод",
    titleAdd: "Пополнение счёта",
    confirmLabel: "Валюта расчета",
    confirmBtn: "Оплатить",
    amountTitle: "Сумма",
    amountPlaceholder: "от 10 до 40 000 ₽",
    withdrawalTitle: "Запросить вывод",
    withdrawalLabel: "Сколько смартов хотите вывести?",
    withdrawalHint: "Эта сумма будет заморожена на вашем счете, пока запрос не будет подтвержден или отклонен",
    comment: "Комментарий",
    commentHint: "Напишите, на какой счет вы хотели бы вывести средства и как с вами лучше связаться, если возникнут вопросы",
    withdrawalBtn: "Запросить",
    msg: "Запрос отправлен",
    code: "Активировать код",
    refill_1: "Чтобы записаться на это занятие, на счете не хватает",
    refill_2: "смартов"
};

let transactionsText = {
    last: "Последние транзакции",
    history: "История транзакций"
};

let dialogText = {
    dialogMenuAdd: "Добавить участников",
    dialogMenuReanme: "Переименовать чат",
    dialogMenuRemove: "Удалить чат",
    dialogMenuLeave: "Покинуть чат",
    online: "В сети",
    offline: "Не в сети",
    hint: "Выберите контакт, чтобы начать перписку",
    blackList: "Вы не можете отправлять сообщения этому пользователю",
    yourBlackList: "Этот пользователь в вашем",
    yourBlackList2: "черном списке",
    dialogCreator: 'Cоздатель чата',
    supportName: 'Техническая поддержка',
    createChat: "Создать групповой чат",
    create1: 'Пользователь', 
    create2: 'создал чат',
    addUser1: 'Пользователь', 
    addUser2: 'добавлен в чат',
    removeUser1: 'Пользователь', 
    removeUser2:'был удален из чата',
    renameChat: 'Чат был переименован на ',
    leaveChat1: 'Пользователь', 
    leaveChat2: 'покниул чат'
};

let commentsText = {
    title: "Комментарии",
    complaint: "Вы пожаловались",
    complaint_mod: "Пользователь пожаловался",
    answer: "ответил",
    remote: "Удалено",
    answerTitle: "Ответ",
    addAnswer: "Ответить",
    deleteComment: "Удалить",
    addComplaint: "Пожаловаться",
    addComment: "Добавить комментарий",
    msg: "Комментарий добавлен",
    msgDelete: "Комментарий удален",
    msgComplaint: "Жалоба отправлена"
};

let documentsText = {
    title: "Документы, сертификаты и дипломы",
    activeLoad: "Активные загрузки",
    stack: "В очереди",
    loadBtn: "Загрузить файлы",
    tryAgain: "Попробуйте еще раз",
    loading: "Идет загрузка",
    upload: "Загрузить документ",
    you_may: "Вы можете загружать файлы jpg, jpeg, png весом не более 5 мегабайт и размером не более 1280x1280 пикселей"
};
