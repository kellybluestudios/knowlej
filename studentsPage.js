let dataStudnents;

const getStudents = async () => {
    const response = await fetch('https://dev.k12hosting.io/api/students', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },

    })

    //console.log(response);
    const studentsData = await response.json();
    console.log(studentsData.success);
    if (studentsData.success == true) {
        let data = studentsData.data;
        $(document).ready(function () {
            // const dataSet = [{ "name": "Lynsey Danshin", "position": "Biostatistician II", "office": "Apt 899", "extn": "01HHC3J46MSJWN96J5F73KZTKJ", "start_date": "11/16/2023", "salary": "$9.73" },
            // { "name": "Marika Coney", "position": "Budget/Accounting Analyst II", "office": "Room 1355", "extn": "01HHC3J46PTVNCN00W6VAP9YF8", "start_date": "11/19/2023", "salary": "$7.54" },
            // { "name": "Goldi Croley", "position": "Executive Secretary", "office": "Apt 374", "extn": "01HHC3J46RAZ31XMGRJBFHFR58", "start_date": "4/6/2023", "salary": "$0.47" },
            // { "name": "Noll Wigley", "position": "Environmental Specialist", "office": "PO Box 63708", "extn": "01HHC3J46S7W4BZK2Q1J44TCDY", "start_date": "2/28/2023", "salary": "$8.28" },
            // { "name": "Cathleen Oliphant", "position": "Human Resources Manager", "office": "Room 1751", "extn": "01HHC3J46VXWN78YPXJQQHVNJ1", "start_date": "4/21/2023", "salary": "$2.44" },
            // { "name": "Karin Fardo", "position": "Marketing Manager", "office": "Room 186", "extn": "01HHC3J46W8CJXTSJCJXC3WJ64", "start_date": "12/4/2023", "salary": "$6.46" },
            // { "name": "Kelsey Morfell", "position": "Administrative Officer", "office": "PO Box 66274", "extn": "01HHC3J46Y8E5CYWG9YVT630SH", "start_date": "4/15/2023", "salary": "$7.29" },
            // { "name": "Michaeline Anfossi", "position": "Director of Sales", "office": "17th Floor", "extn": "01HHC3J4701MB27B9M6S9P483X", "start_date": "6/16/2023", "salary": "$6.85" },
            // { "name": "Ker Mantz", "position": "Budget/Accounting Analyst II", "office": "Room 1395", "extn": "01HHC3J472GJWNJBYKQJ7MKH20", "start_date": "12/24/2022", "salary": "$9.96" },
            // { "name": "Gennie Ferriman", "position": "Accountant III", "office": "14th Floor", "extn": "01HHC3J473WN8RP607D0X0K1S4", "start_date": "9/18/2023", "salary": "$9.91" },
            // { "name": "Janel Grinval", "position": "Geologist II", "office": "5th Floor", "extn": "01HHC3J475BSHKXF1HN1DP5KKQ", "start_date": "12/29/2022", "salary": "$7.70" },
            // { "name": "Enid Jelk", "position": "Editor", "office": "Suite 44", "extn": "01HHC3J4779KTXT8R9BK4Q77V2", "start_date": "11/23/2023", "salary": "$0.41" },
            // { "name": "Deirdre Boick", "position": "Director of Sales", "office": "17th Floor", "extn": "01HHC3J478M0NNHN1GKSSWNYP1", "start_date": "11/17/2023", "salary": "$8.57" },
            // { "name": "Alon McKeever", "position": "Occupational Therapist", "office": "Room 1463", "extn": "01HHC3J47AMJJYS7TMJP07X9SD", "start_date": "12/30/2022", "salary": "$5.73" },
            // { "name": "Saw Varndall", "position": "VP Sales", "office": "PO Box 31439", "extn": "01HHC3J47B0T2FD0T5DSVBDBN5", "start_date": "3/28/2023", "salary": "$8.87" },
            // { "name": "Lucille Chatten", "position": "Web Developer I", "office": "Apt 1084", "extn": "01HHC3J47CEBMS6T0HT1YK8Z43", "start_date": "7/29/2023", "salary": "$0.56" },
            // { "name": "Malva Mantrup", "position": "Programmer II", "office": "PO Box 84980", "extn": "01HHC3J47E1FT0FB15EKDM6V7W", "start_date": "12/9/2023", "salary": "$8.73" },
            // { "name": "Margaret Warmisham", "position": "Research Assistant I", "office": "PO Box 59519", "extn": "01HHC3J47FTT0YMXTHRJPX81HJ", "start_date": "6/24/2023", "salary": "$0.93" },
            // { "name": "Beck Playfair", "position": "Internal Auditor", "office": "PO Box 11154", "extn": "01HHC3J47HHPMSP7N8RWZZRJ9W", "start_date": "10/27/2023", "salary": "$9.03" },
            // { "name": "Griswold Crimpe", "position": "Financial Analyst", "office": "Apt 56", "extn": "01HHC3J47J8YBASQNP6CZ16HSC", "start_date": "3/25/2023", "salary": "$1.47" }]

            const dataSet = data;

            console.log(dataSet)

            new DataTable('#students_table', {
                "data": dataSet,
                scrollX: true,
                "columns": [
                    { "data": "id", "title": "ID", "visible": false },
                    { "data": "created_at", "title": "Created At", "visible": false },
                    { "data": "updated_at", "title": "Updated At", "visible": false },
                    { "data": "students_id", "title": "Student ID" },
                    { "data": "students_first_name", "title": "First Name" },
                    { "data": "students_last_name", "title": "Last Name" },
                    { "data": "students_rewards_email", "title": "Email" },
                    { "data": "students_grade_level", "title": "Grade Level" },
                    { "data": "students_start_date", "title": "Start Date" },
                    { "data": "students_end_date", "title": "End Date" },
                    { "data": "students_attendence_rate", "title": "Attendence Rate" },
                    { "data": "students_learning_hours", "title": "Learning Hours" },
                    { "data": "students_rewards_recieve", "title": "Rewards Receive" },
                    { "data": "students_top_sub_1", "title": "Top Subject 1" },
                    { "data": "students_top_sub_2", "title": "Top Subject 2" },
                    { "data": "students_top_sub_3", "title": "Top Subject 3" },
                ]
            });
        })



    } else {
        console.log('Something went wrong!')
    }

}


getStudents();


console.log(dataStudnents);


$('#upload_students_form').submit(function (e) {
    e.preventDefault();
    console.log("sunmiu")
    let file = $('#file').val()
    console.log(file)


    const importStudents = async () => {

        console.log(file)
        const response = await fetch('https://dev.k12hosting.io/api/studentsimport', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            },

            body: JSON.stringify({
                file: $('#file').val()
            })

        });

        const data = await response.json();

        console.log(data);
    }



    importStudents()

    // const upload = (file) => {
    //     const formData = new FormData();
    //     formData.append('file', file);

    //     fetch('https://dev.k12hosting.io/api/studentsimport', {
    //         method: 'POST',
    //         body: formData
    //     })
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             return response.json();
    //         })
    //         .then(success => console.log(success))
    //         .catch(error => console.log(error));
    // };


    // upload(file);

 


})


