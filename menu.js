class Student {
    constructor(name) {
        this.name = name;
    }
    describe()  {
        return `${this.name} is a student in form ${this.form}.`
    }
}

class Form {
    constructor(formName) {
        this.formName = formName;
        this.students = [];
    }
    addStudent(student) {
        if (student instanceof Student) {
            this.students.push(student);
        } else {
            throw new Error(`You can only add an instance of Student. Argument is not a student: ${student}.`);
        }
    }
    describe() {
        return `Form ${this.formName} has ${this.students.length} students.`;
    }
}

class Menu {
    constructor() {
        this.students = [];
        this.selectedStudent = null;
        this.forms = [];
    }
    start() {
        let selection = this.showMainMenuOptions(); 
        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createForm();
                    break;
                case '2':
                    this.viewForm();
                    break;
                case '3': 
                    this.deleteForm();
                    break;
                case '4':
                    this.displayForms();
                    break;
                default: 
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert('Goodbye!');
    }

    showMainMenuOptions() {
        return prompt(`
            0) Leave
            1) Create a new Form
            2) View Form
            3) Delete Form
            4) Display All Forms
        `)
    }
    showFormMenuOptions(formInfo) {
        return prompt(`
            0) Back
            1) Create Student
            2) Delete Student
            ---------------------
            ${formInfo}
        `);
    }

    displayForms() {
        let formString = '';
        for (let i = 0; i < this.forms.length; i++) {
            formString += i + ') ' + this.forms[i].formName + '\n';
        }
        alert(formString);
    }

    createForm() {
        let name = prompt('Enter name of new Form:');
        this.forms.push(new Form(name));
    }

    viewForm() {
        let index = prompt('Enter the index number of the form you wish to view:');
        if (index > -1 && index < this.forms.length) {
            this.selectedForm = this.forms[index];
            let description = 'Form Name: ' + this.selectedForm.formName + '\n';

            for(let i = 0; i < this.selectedForm.students.length; i++) {
                description += i + ') ' + this.selectedForm.students[i].name + ' - ' + this.selectedForm.students[i].formName + '\n';
            }

            let selection = this.showFormMenuOptions(description);
            switch(selection) {
                case '1': 
                    this.createStudent();
                    break;
                case '2': 
                    this.deleteStudent();
                    break;
            }
        }
    }
    deleteForm() {
        let index = prompt(`Enter the index number of the Form you wish to delete:`);
        if (index > -1 && index < this.forms.length) {
            this.forms.splice(index, 1);
        }
    }
    
    createStudent() {
        let name = prompt(`Enter name for new student:`);
        this.selectedForm.students.push(new Student(name));
    }

    deleteStudent() {
        let index = prompt(`Enter the number of the student you wish to delete:`);
        if (index > -1 && index < this.selectedForm.students.length) {
            this.selectedForm.students.splice(index, 1);
        }
    }

}

let menu = new Menu();
menu.start();
