Vue.component("task", {
    props: ["data"],  
    data() {
        return {
            isDone: false
        };
    },
    methods: {
        delete_task() {
            this.$emit("delete_task")
        }
    },
    template: `
    <div class="task">
        <div class="characteristics-task">
            <h1 :class="{ 'crossed': isDone }">{{ data.title }}</h1>
            <p :class="{ 'crossed': isDone }">{{ data.disc }}</p>
            <p :class="{ 'crossed': isDone }" v-if="isNaN(data.date)">до {{ data.date }}</p>
        </div>
        <div class="action-task">
            <input v-model="isDone" type="checkbox">
            <p v-on:click="delete_task">🗑️</p>
        </div>
    </div>`

});

var vue = new Vue ({
    el: "#app",
    data: {
        withoutDate: false,
        newTask: false,
        newTaskData: {
            title: '',
            disc: '',
            date: ''
        },
        tasks: []
    },
    mounted() {
        this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    },
    watch: {
        tasks() {
            localStorage.setItem("tasks", JSON.stringify(this.tasks));
        }
    },
    methods: {
        add_task() {
            if(this.newTaskData.title != '' && (isNaN(this.newTaskData.date) || this.withoutDate)){
                if (this.withoutDate){
                    this.newTaskData.date = '';
                }
                this.tasks.push({
                    title: this.newTaskData.title,
                    disc: this.newTaskData.disc,
                    date: this.newTaskData.date
                });
                this.newTaskData.title = '';
                this.newTaskData.disc = '';
                this.newTaskData.date = '';
            }
        },
        delete_task(id) {
            this.tasks.splice(id, 1);
        }
    }
});
document.getElementById("date").min = new Date().toISOString().split("T")[0];