class Course {
    constructor(name, lecturer, room, day, time) {
        this.name = name;
        this.lecturer = lecturer;
        this.room = room;
        this.day = day;
        this.time = time;
        this.id = Date.now().toString();
    }
}

class Dashboard {
    constructor() {
        this.courses = [];
        this.initElements();
        this.loadCourses();
        this.renderDays();
        this.initEventListeners();
        this.initTheme();
    }

    initElements() {
        this.daysContainer = document.querySelector('.days-container');
        this.matkulInput = document.getElementById('matkulInput');
        this.dosenInput = document.getElementById('dosenInput');
        this.ruangInput = document.getElementById('ruangInput');
        this.hariInput = document.getElementById('hariInput');
        this.waktuInput = document.getElementById('waktuInput');
        this.addBtn = document.getElementById('addBtn');
        this.themeBtn = document.getElementById('themeBtn');
    }

    initEventListeners() {
        this.addBtn.addEventListener('click', () => this.addCourse());
        this.themeBtn.addEventListener('click', () => this.toggleTheme());
    }

    initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.updateThemeIcon(savedTheme);
    }

    updateThemeIcon(theme) {
        const icon = this.themeBtn.querySelector('i');
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.updateThemeIcon(newTheme);
    }

    async loadCourses() {
        try {
            const savedCourses = localStorage.getItem('courses');
            if (savedCourses) {
                this.courses = JSON.parse(savedCourses);
                await new Promise(resolve => setTimeout(resolve, 100)); // Simulasi async
            }
        } catch (error) {
            console.error('Error loading courses:', error);
        }
    }

    saveCourses() {
        localStorage.setItem('courses', JSON.stringify(this.courses));
    }

    addCourse() {
        const name = this.matkulInput.value.trim();
        const lecturer = this.dosenInput.value.trim();
        const room = this.ruangInput.value.trim();
        const day = this.hariInput.value;
        const time = this.waktuInput.value;

        if (!name || !time) {
            alert('Nama mata kuliah dan waktu harus diisi!');
            return;
        }

        const newCourse = new Course(name, lecturer, room, day, time);
        this.courses.push(newCourse);
        this.saveCourses();
        this.renderDays();
        this.clearInputs();
    }

    clearInputs() {
        this.matkulInput.value = '';
        this.dosenInput.value = '';
        this.ruangInput.value = '';
        this.waktuInput.value = '';
    }

    editCourse(id) {
        const course = this.courses.find(c => c.id === id);
        if (!course) return;

        this.matkulInput.value = course.name;
        this.dosenInput.value = course.lecturer;
        this.ruangInput.value = course.room;
        this.hariInput.value = course.day;
        this.waktuInput.value = course.time;

        this.deleteCourse(id, false);
        this.addBtn.textContent = 'Update Mata Kuliah';
        this.addBtn.onclick = () => {
            course.name = this.matkulInput.value.trim();
            course.lecturer = this.dosenInput.value.trim();
            course.room = this.ruangInput.value.trim();
            course.day = this.hariInput.value;
            course.time = this.waktuInput.value;

            this.courses.push(course);
            this.saveCourses();
            this.renderDays();
            this.clearInputs();
            
            this.addBtn.textContent = 'Tambah Mata Kuliah';
            this.addBtn.onclick = () => this.addCourse();
        };
    }

    deleteCourse(id, save = true) {
        this.courses = this.courses.filter(course => course.id !== id);
        if (save) {
            this.saveCourses();
            this.renderDays();
        }
    }

    renderDays() {
        const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        this.daysContainer.innerHTML = '';

        days.forEach(day => {
            const dayCourses = this.courses.filter(course => course.day === day);
            if (dayCourses.length === 0) return;

            const dayCard = document.createElement('div');
            dayCard.className = 'day-card';

            dayCard.innerHTML = `
                <div class="day-header">
                    <h2>${day}</h2>
                    <span>${dayCourses.length} Mata Kuliah</span>
                </div>
                <ul class="course-list">
                    ${this.renderCourses(dayCourses)}
                </ul>
            `;

            this.daysContainer.appendChild(dayCard);
        });
    }

    renderCourses = (courses) => {
        return courses.map(course => `
            <li class="course-item">
                <h3>${course.name}</h3>
                <p>Dosen: ${course.lecturer || '-'}</p>
                <p>Ruang: ${course.room || '-'}</p>
                <p>Waktu: ${course.time}</p>
                <div class="course-actions">
                    <button class="edit-btn" onclick="dashboard.editCourse('${course.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete-btn" onclick="dashboard.deleteCourse('${course.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </li>
        `).join('');
    }
}

// Initialize dashboard
const dashboard = new Dashboard();