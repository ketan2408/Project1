document.addEventListener('DOMContentLoaded', function() {
    const { jsPDF } = window.jspdf;

    // Function to add more education fields
    function addEducationField() {
        const educationFields = document.getElementById('education-fields');
        const educationItem = document.createElement('div');
        educationItem.className = 'education-item';
        educationItem.innerHTML = `
            <label for="edu-university">University Name:</label>
            <input type="text" class="edu-university" name="edu-university">

            <label for="edu-degree">Degree:</label>
            <input type="text" class="edu-degree" name="edu-degree">

            <label for="edu-year">Graduation Year:</label>
            <input type="text" class="edu-year" name="edu-year">

            <label for="edu-description">Description:</label>
            <textarea class="edu-description" name="edu-description"></textarea>
        `;
        educationFields.appendChild(educationItem);
    }

    // Function to add more work experience fields
    function addExperienceField() {
        const experienceFields = document.getElementById('experience-fields');
        const experienceItem = document.createElement('div');
        experienceItem.className = 'experience-item';
        experienceItem.innerHTML = `
            <label for="job-title">Job Title:</label>
            <input type="text" class="job-title" name="job-title">

            <label for="job-company">Company Name:</label>
            <input type="text" class="job-company" name="job-company">

            <label for="job-duration">Duration:</label>
            <input type="text" class="job-duration" name="job-duration">

            <label for="job-description">Description:</label>
            <textarea class="job-description" name="job-description"></textarea>
        `;
        experienceFields.appendChild(experienceItem);
    }

    // Function to add more project fields
    function addProjectField() {
        const projectsFields = document.getElementById('projects-fields');
        const projectItem = document.createElement('div');
        projectItem.className = 'project-item';
        projectItem.innerHTML = `
            <label for="project-title">Project Title:</label>
            <input type="text" class="project-title" name="project-title">

            <label for="project-description">Description:</label>
            <textarea class="project-description" name="project-description"></textarea>
        `;
        projectsFields.appendChild(projectItem);
    }

    // Event listeners for the "Add Another" buttons
    document.getElementById('add-education').addEventListener('click', addEducationField);
    document.getElementById('add-experience').addEventListener('click', addExperienceField);
    document.getElementById('add-project').addEventListener('click', addProjectField);

    // Function to generate PDF
    document.getElementById('resume-form').addEventListener('submit', function(e) {
        e.preventDefault();

        const pdf = new jsPDF();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const intro = document.getElementById('intro').value;
        const skills = document.getElementById('skills').value;

        // Set up styles for the PDF
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(18);

        // Center the title "Resume"
        const pageWidth = pdf.internal.pageSize.getWidth();
        const title = 'Resume';
        const titleWidth = pdf.getTextWidth(title);
        const titleX = (pageWidth - titleWidth) / 2;
        pdf.text(title, titleX, 20);
        
         // Add a horizontal line
         pdf.setDrawColor(0, 0, 0);
         pdf.setLineWidth(0.5);
         pdf.line(14, 70, pageWidth - 14, 70);

        // Add personal information
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(14);
        pdf.text(`Name: ${name}`, 14, 30);
        pdf.text(`Email: ${email}`, 14, 40);
        pdf.text(`Phone: ${phone}`, 14, 50);
        pdf.text(`Brief Introduction: ${intro}`, 14, 60);

        // Add a horizontal line
        pdf.setDrawColor(0, 0, 0);
        pdf.setLineWidth(0.5);
        pdf.line(14, 70, pageWidth - 14, 70);

        // Add education details
        pdf.setFontSize(16);
        pdf.text('Education', 14, 80);
        let y = 90;
        document.querySelectorAll('#education-fields .education-item').forEach(item => {
            const university = item.querySelector('.edu-university').value;
            const degree = item.querySelector('.edu-degree').value;
            const year = item.querySelector('.edu-year').value;
            const description = item.querySelector('.edu-description').value;
            pdf.setFontSize(14);
            pdf.text(`University Name: ${university}`, 14, y);
            pdf.text(`Degree: ${degree}`, 14, y + 10);
            pdf.text(`Graduation Year: ${year}`, 14, y + 20);
            pdf.text(`Description: ${description}`, 14, y + 30);
            y += 50; // Adjust y for the next section
        });

         // Add a horizontal line
         pdf.setDrawColor(0, 0, 0);
         pdf.setLineWidth(0.5);
         pdf.line(14, 70, pageWidth - 14, 70);

        // Add work experience details
        pdf.setFontSize(16);
        pdf.text('Work Experience', 14, y);
        y += 10;
        document.querySelectorAll('#experience-fields .experience-item').forEach(item => {
            const jobTitle = item.querySelector('.job-title').value;
            const company = item.querySelector('.job-company').value;
            const duration = item.querySelector('.job-duration').value;
            const description = item.querySelector('.job-description').value;
            pdf.setFontSize(14);
            pdf.text(`Job Title: ${jobTitle}`, 14, y);
            pdf.text(`Company: ${company}`, 14, y + 10);
            pdf.text(`Duration: ${duration}`, 14, y + 20);
            pdf.text(`Description: ${description}`, 14, y + 30);
            y += 50;
        });

         // Add a horizontal line
         pdf.setDrawColor(0, 0, 0);
         pdf.setLineWidth(0.5);
         pdf.line(14, 70, pageWidth - 14, 70);

        // Add skills
        pdf.setFontSize(16);
        pdf.text('Skills', 14, y);
        y += 10;
        const skillsList = skills.split('\n').map(skill => `- ${skill}`);
        skillsList.forEach((skill, index) => {
            pdf.text(skill, 14, y + index * 10);
        });
        y += skillsList.length * 10 + 10;

         // Add a horizontal line
         pdf.setDrawColor(0, 0, 0);
         pdf.setLineWidth(0.5);
         pdf.line(14, 70, pageWidth - 14, 70);

        // Add projects
        pdf.setFontSize(16);
        pdf.text('Projects', 14, y);
        y += 10;
        document.querySelectorAll('#projects-fields .project-item').forEach(item => {
            const projectTitle = item.querySelector('.project-title').value;
            const projectDescription = item.querySelector('.project-description').value;
            pdf.setFontSize(14);
            pdf.text(`Project Title: ${projectTitle}`, 14, y);
            pdf.text(`Description: ${projectDescription}`, 14, y + 10);
            y += 30;
        });

        // Save the PDF
        pdf.save('resume.pdf');
    });

    // Modal functionality
    const modal = document.getElementById('modal');
    const modalText = document.getElementById('modal-text');
    const closeBtn = document.querySelector('.close-btn');

    function openModal(message) {
        modalText.textContent = message;
        modal.style.display = 'block';
    }

    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }

    // Add modal triggers for more interactive features or tips
    document.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('focus', function() {
            openModal('Tip: Fill out this section carefully.');
        });
    });

    // Example: Open modal with specific details for "Resume Form"
    document.querySelector('a[href="#form"]').addEventListener('click', function() {
        openModal('Fill out each section to create your resume.');
    });
});
