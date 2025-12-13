import React from 'react';

const Resume = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 flex justify-center font-sans">
      {/* Container chính mô phỏng khổ giấy A4 */}
      <div className="w-[210mm] bg-white shadow-2xl p-10 md:p-12 text-gray-800 leading-relaxed">
        
        {/* HEADER SECTION */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-700 mb-2 uppercase tracking-wide">
            Quoc Bao Truong
          </h1>
          <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">
            Student Majoring in Information Technology
          </h2>
          
          <div className="flex flex-wrap justify-center items-center gap-x-4 text-sm text-gray-700">
            <div className="flex items-center">
              <span className="text-red-600 mr-1">📍</span>
              <span>Binh Hung, Ho Chi Minh City, Viet Nam</span>
            </div>
            <div className="hidden sm:block text-gray-400">|</div>
            <div className="flex items-center">
              <span className="text-red-600 mr-1">☎</span>
              <span className="font-medium">Contact: 0399 503 025</span>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-x-4 text-sm text-gray-700 mt-1">
            <div className="flex items-center">
              <span className="text-gray-600 mr-1">✉</span>
              <span className="font-medium">Email: </span>
              <a href="mailto:baotruong.190404@gmail.com" className="text-blue-600 underline ml-1">
                baotruong.190404@gmail.com
              </a>
            </div>
            <div className="hidden sm:block text-gray-400">|</div>
            <div className="flex items-center">
              <span className="font-bold mr-1">Github:</span>
              <a href="https://github.com/Truong-Quoc-Bao" className="text-blue-600 underline">
                https://github.com/Truong-Quoc-Bao
              </a>
            </div>
          </div>
        </header>

        <hr className="border-t border-purple-300 mb-6" />

        {/* SUMMARY SECTION */}
        <section className="mb-8">
          <h3 className="text-purple-700 font-bold uppercase text-lg border-b border-purple-200 pb-1 mb-3">
            Summary
          </h3>
          <p className="text-sm text-justify mb-3">
            I’m a fourth-year Information Technology student at Saigon University, passionate about web
            development and driven to become a skilled Full-Stack Developer dedicated to building efficient,
            scalable, and user-friendly applications.
          </p>
          <p className="text-sm text-justify mb-3">
            Throughout my studies, I’ve built a strong foundation in <strong>JavaScript, HTML, CSS</strong>, and <strong>SQL</strong>. Along with
            hands-on experience using <strong>ReactJS</strong> and <strong>Node.js</strong> to create modern, responsive web applications. I enjoy
            solving problems through clean, maintainable code and constantly exploring new technologies to
            improve my craft.
          </p>
          <p className="text-sm text-justify">
            I’m seeking an internship where I can apply what I’ve learned to real-world projects, collaborate with
            experienced developers, and continue growing both technically and professionally. I’m eager to
            contribute to your team while developing my skills and mindset as a future full-stack developer.
          </p>
        </section>

        {/* WORK EXPERIENCE SECTION */}
        <section className="mb-8">
          <h3 className="text-purple-700 font-bold uppercase text-lg border-b border-purple-200 pb-1 mb-4">
            Work Experience
          </h3>

          {/* Job 1 Header */}
          <div className="mb-6">
            <h4 className="font-bold text-base">Full-Stack Web Developer (Student Projects)</h4>
            <div className="flex justify-between items-baseline mb-4">
              <span className="italic font-medium">Saigon University (Student Projects) — 2022–2025.</span>
            </div>

            {/* Year 4 Project */}
            <div className="mb-6 pl-1">
              <div className="flex justify-between items-baseline mb-1">
                <h5 className="font-bold text-sm">Year 4 – Full-Stack Development & Data-Driven Web Applications.</h5>
                <span className="text-sm font-bold whitespace-nowrap">SEP 2025 - DEC 2025</span>
              </div>
              <div className="text-sm mb-2">
                <span className="font-bold">Github: </span>
                <a href="https://github.com/Truong-Quoc-Bao/BaDaFuTa.git" className="text-blue-600 underline break-all">
                  https://github.com/Truong-Quoc-Bao/BaDaFuTa.git
                </a>
              </div>
              
              <div className="mb-1 text-sm font-bold">Responsibilities:</div>
              <ul className="list-disc list-outside ml-5 text-sm mb-2 space-y-1">
                <li>Designed and developed full-stack web applications using ReactJS, Node.js, and Express.js to deliver responsive and maintainable user experiences.</li>
                <li>Created RESTful APIs for data management and integrated with PostgreSQL databases.</li>
                <li>Implemented responsive UI/UX design using Tailwind CSS.</li>
              </ul>

              <div className="mb-1 text-sm"><span className="font-bold">Skills Used:</span></div>
              <ul className="list-disc list-outside ml-5 text-sm mb-2">
                <li>ReactJS, Node.js, Express.js, Tailwind CSS, PostgreSQL, GitHub, Docker.</li>
              </ul>

              <div className="mb-1 text-sm font-bold">Achievements:</div>
              <ul className="list-disc list-outside ml-5 text-sm space-y-1">
                <li>Successfully deployed a prototype of a food delivery web app for coursework evaluation.</li>
                <li>Optimized database queries and component rendering to significantly improve app performance.</li>
              </ul>
            </div>

            {/* Year 3 Project */}
            <div className="mb-6 pl-1">
              <div className="flex justify-between items-baseline mb-1">
                <h5 className="font-bold text-sm">Year 3 – System Analysis & Back-End Development.</h5>
                <span className="text-sm font-bold whitespace-nowrap">SEP 2024 - JUN 2025</span>
              </div>
              <div className="text-sm mb-2 flex flex-col">
                <div>
                  <span className="font-bold">Github: </span>
                  <a href="https://github.com/letandat1607/QLNSTL.git" className="text-blue-600 underline break-all">
                    https://github.com/letandat1607/QLNSTL.git
                  </a>
                </div>
                <div className="ml-[48px] md:ml-[52px]">
                   <a href="https://github.com/Truong-Quoc-Bao/Postgre-connected-SQL-Server.git" className="text-blue-600 underline break-all">
                    https://github.com/Truong-Quoc-Bao/Postgre-connected-SQL-Server.git
                  </a>
                </div>
              </div>

              <div className="mb-1 text-sm font-bold">Responsibilities:</div>
              <ul className="list-disc list-outside ml-5 text-sm mb-2 space-y-1">
                <li>Developed WinForms-based management systems using C# and MongoDB, integrating data synchronization between SQL and NoSQL databases.</li>
                <li>Conducted Object-Oriented Analysis and Design (OOAD) with UML diagrams (use case, class, sequence).</li>
                <li>Integrated and synchronized data between PostgreSQL and SQL Server.</li>
              </ul>

              <div className="mb-1 text-sm"><span className="font-bold">Skills Used:</span></div>
              <ul className="list-disc list-outside ml-5 text-sm mb-2">
                <li>C#, MongoDB, SQL Server, PostgreSQL, Visual Studio, Git, UML (OOAD).</li>
              </ul>

              <div className="mb-1 text-sm font-bold">Achievements:</div>
              <ul className="list-disc list-outside ml-5 text-sm space-y-1">
                <li>Completed a system analysis project with high distinction.</li>
                <li>Enhanced understanding of distributed data management and interoperability.</li>
                <li>OO design principles.</li>
              </ul>
            </div>

            {/* Year 2 Project */}
            <div className="pl-1">
              <div className="flex justify-between items-baseline mb-1">
                <h5 className="font-bold text-sm">Year 2 – Front-End Development Foundation.</h5>
                <span className="text-sm font-bold whitespace-nowrap">SEP 2023 - JUN 2024</span>
              </div>
              <div className="text-sm mb-2">
                <span className="font-bold">Github: </span>
                <a href="https://github.com/Truong-Quoc-Bao/PHP_Jewelry_Web.git" className="text-blue-600 underline break-all">
                  https://github.com/Truong-Quoc-Bao/PHP_Jewelry_Web.git
                </a>
              </div>

              <div className="mb-1 text-sm font-bold">Responsibilities:</div>
              <ul className="list-disc list-outside ml-5 text-sm mb-2 space-y-1">
                <li>Developed responsive websites using HTML, CSS, JavaScript, PHP, and Bootstrap.</li>
                <li>Focused on layout design, usability, and basic interactivity.</li>
                <li>Conducted system analysis and design for website and information system projects, including database schema planning and user workflow modeling.</li>
              </ul>

              <div className="mb-1 text-sm"><span className="font-bold">Skills Used:</span></div>
              <ul className="list-disc list-outside ml-5 text-sm mb-2">
                <li>HTML, CSS, JavaScript, PHP, Bootstrap, Git, UML, Database Design</li>
              </ul>

              <div className="mb-1 text-sm font-bold">Achievements:</div>
              <ul className="list-disc list-outside ml-5 text-sm space-y-1">
                <li>Built a functional portfolio website as part of coursework and information system.</li>
                <li>Strengthened understanding of front-end fundamentals and client-server communication and system design principles.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* EDUCATION SECTION */}
        <section className="mb-8">
          <h3 className="text-purple-700 font-bold uppercase text-lg border-b border-purple-200 pb-1 mb-3">
            Education
          </h3>
          <div className="text-sm space-y-1">
            <p><span className="font-normal">Sai Gon University — Ho Chi Minh City, Vietnam.</span></p>
            <p>Bachelor of Engineering (Information Technology).</p>
            <p>Specialization: Web Development & System Analysis.</p>
            <p>Study period: 2022 – 2026.</p>
            <p className="mt-2 text-justify">
              <span className="font-bold">Relevant Coursework: </span>
              Web Programming, Database Management, Database Systems, Information Systems Analysis and Design, Object-Oriented Analysis and Design, Software Engineering, Software Testing, Full-Stack Web Development.
            </p>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section className="mb-8">
          <h3 className="text-purple-700 font-bold uppercase text-lg border-b border-purple-200 pb-1 mb-3">
            Skills
          </h3>
          <div className="mb-4">
            <h4 className="font-bold text-sm mb-2">Technical Skills:</h4>
            <ul className="list-disc list-outside ml-5 text-sm space-y-1">
              <li><span className="font-bold">Programming Languages:</span> HTML, CSS, JavaScript, PHP, C#, C++, Java, Python, SQL, UML.</li>
              <li><span className="font-bold">Front-End Development:</span> ReactJS, Bootstrap, Tailwind CSS.</li>
              <li><span className="font-bold">Back-End Development:</span> Node.js, Express, PHP.</li>
              <li><span className="font-bold">Database Management:</span> PostgreSQL, MongoDB, SQL Server, MySQL.</li>
              <li><span className="font-bold">Version Control & Collaboration:</span> Git, GitHub.</li>
              <li>
                <span className="font-bold">DevOps & Tools:</span> Docker, Postman, VS Code, Visual Studio Code, Anaconda (Jupyter Notebook), VMware Fusion, Azure Data Studio, TeamViewer, XAMPP.
              </li>
              <li><span className="font-bold">Other Skills:</span> System Analysis (OOAD), Data Analysis, API Design, Problem-Solving, Teamwork.</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-sm mb-2">Soft Skills:</h4>
            <ul className="list-disc list-outside ml-5 text-sm space-y-1">
              <li>Teamwork and collaboration in agile projects.</li>
              <li>Problem-solving & critical thinking — able to approach complex issues with structured logic.</li>
              <li>Communication & documentation — clear, concise, and team-oriented.</li>
              <li>Time management and task prioritization.</li>
              <li>Adaptability and eagerness to learn new technologies.</li>
              <li>Responsibility and attention to detail.</li>
            </ul>
          </div>
        </section>

        {/* LANGUAGES SECTION */}
        <section>
          <h3 className="text-purple-700 font-bold uppercase text-lg border-b border-purple-200 pb-1 mb-3">
            Languages
          </h3>
          <ul className="text-sm list-none space-y-1">
            <li><span className="font-bold">English:</span> Basic working proficiency (CEFR B1, eager to improve).</li>
            <li><span className="font-bold">Vietnamese:</span> Native.</li>
          </ul>
        </section>

      </div>
    </div>
  );
};

export default Resume;