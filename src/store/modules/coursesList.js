import  Vue from 'vue'

let courseType = '';

export default {
    namespaced: true,
    state: {
        courses: {
            items: [],
            _meta: {
                currentPage: 0,
                pageCount: 0,
                perPage: 15,
                totalCount: 0
            }
        },
    },
    getters: {
        courses(state){
            return state.courses;
        }
    },
    mutations: {
        SetCourses(state, data){
            state.courses = data;
        },
    },
    actions: {
        LoadCoursesPopular ({commit}){
            let url = process.env.NODE_ENV !== 'production' ? 'course/courseListPopular.json' : 'coursesPopular';

            return new Promise((resolve, reject) => {
                Vue.http.get(url)
                    .then(response => response.json())
                    .then(data => {
                        commit('SetCourses' ,data);
                        resolve();
                    })
            })
        },
    }
};