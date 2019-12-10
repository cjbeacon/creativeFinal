var app = new Vue({
  el: '#app',
  data: {
    showForm: false,
    user: null,
    username: '',
    password: '',
    error: '',
    addedTitle: '',
    addedTxt: '',
    notes: {},
  },
  created() {
    this.getUser();
    this.getNotes();
  },
  methods: {
    toggleForm() {
      this.getNotes();
      this.error = "";
      this.username = "";
      this.password = "";
      this.showForm = !this.showForm;
    },
    async register() {
      this.error = "";
      try {
        let response = await axios.post("/api/users", {
          username: this.username,
          password: this.password
        });
        this.user = response.data;
        // close the dialog
        this.toggleForm();
      }
      catch (error) {
        this.error = error.response.data.message;
      }
    },
    async login() {
      this.error = "";
      try {
        let response = await axios.post("/api/users/login", {
          username: this.username,
          password: this.password
        });
        this.user = response.data;
        // close the dialog
        this.toggleForm();
      }
      catch (error) {
        this.error = error.response.data.message;
      }
    },
    async logout() {
      try {
        let response = await axios.delete("/api/users");
        this.user = null;
        this.getNotes();
      }
      catch (error) {
        // don't worry about it
      }
    },
    async getUser() {
      try {
        let response = await axios.get("/api/users");
        this.user = response.data;
        this.getNotes();
      }
      catch (error) {
        // Not logged in. That's OK!
      }
    },
    async getNotes() {
      try {
        let url = "/api/notes/" + this.user.username
        let response = await axios.get(url);
        this.notes = response.data;
      }
      catch (error) {
        console.log(error);
      }
    },
    closeForm() {
      this.showForm = false;
    },
    async addNote() {
      try {
        let response = await axios.post("/api/notes", {
          title: this.addedTitle,
          txt: this.addedTxt,
          usrid: this.user.username,
        });
        this.addedTitle = "";
        this.addedTxt = "";
        this.getNotes();
      }
      catch (error) {
        console.log(error);
      }
    },
    async deleteNote(note) {
      try {
        let response = await axios.delete("/api/notes/" + note._id);
        this.getNotes();
      }
      catch (error) {
        this.toggleForm();
      }
    }
  }
});
