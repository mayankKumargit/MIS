import { PieChart } from '@mui/x-charts/PieChart';
import { useEffect, useState } from 'react';
import axios from 'axios'

export default function Dashboard() {

  const [students,setStudents]=useState("")
  const [programStudents,setProgramStudents]=useState({})
  const [categoryStudents,setCategoryStudents]=useState({})
  const [categoryFaculty,setCategoryFaculty]=useState({})
  const [categorySubjects,setCategorySubjects]=useState({})
  const [deptProgStudent,setDeptProgStudent]=useState({})

  

  useEffect(() => {
    axios.get(`https://sarthak503.pythonanywhere.com/api/total-students/`)
      .then(response => {
        //setStudents(response.data)
        console.log(response.data)
        console.log(response.data.total_students)
        setStudents(response.data.total_students)
        
      })
      .catch(error => {
        console.error('Error fetching total students:', error);
      });

     axios.get(`https://sarthak503.pythonanywhere.com/api/count-students-program/`)
      .then(response => {
        //console.log(response.data)
        setProgramStudents(response.data)
        
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
 
      axios.get(`https://sarthak503.pythonanywhere.com/api/count-faculties-dept/`)
      .then(response => {
        setCategoryFaculty(response.data)
        
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

      axios.get(`https://sarthak503.pythonanywhere.com/api/count-students-dept/`)
      .then(response => {
        setCategoryStudents(response.data)
        
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

      axios.get(`https://sarthak503.pythonanywhere.com/api/count-subjects-dept/`)
      .then(response => {
        setCategorySubjects(response.data)
        
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

      axios.get(`https://sarthak503.pythonanywhere.com/api/count-students-dept-prog/`)
      .then(response => {
        setDeptProgStudent(response.data)
        console.log(response.data)

        const data=response.data
        const combinedData = {};

        for (const key in data) {
          const value = data[key];
          const [dept, program] = key.split(' ');
          const combinedKey = `${dept}${program}`;
          
          if (combinedData[combinedKey]) {
            combinedData[combinedKey] += value;
          } else {
            combinedData[combinedKey] = value;
          }
        }
        setDeptProgStudent(combinedData)
        console.log(combinedData)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
      
  }, []);

  //console.log(students,programStudents,categoryFaculty,categoryStudents,categorySubjects)

  return (
    <>
    <div>
      <h1 className='mx-auto text-3xl font-bold'>Admin Dashboard and stats</h1>
      <div className='flex flex-col justify-center items-center mt-14'>
        <div className='flex flex-row justify-center items-center'>
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: programStudents.BT, label: 'BTech Students' },
                { id: 1, value: programStudents.MT, label: 'MTech Students' },
                { id: 2, value: programStudents.PhD ?? null, label: 'PhD Students' },
              ],
              innerRadius: 40,
              paddingAngle: 1,
              cornerRadius: 5,
            },
          ]}
          width={500}
          height={220}
        />
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: deptProgStudent.CSEBT ?? null, label: 'CSE BTech Students' },
                { id: 1, value: deptProgStudent.ECEBT ?? null, label: 'ECE BTech Students' },
                { id: 2, value: deptProgStudent.ECEMT ?? null, label: 'ECE MTech Students' },
                { id: 3, value: deptProgStudent.CSEMT ?? null, label: 'CSE MTech Students' },
                { id: 4, value: deptProgStudent.ECEPhD ?? null, label: 'ECE PhD Students' },
                { id: 5, value: deptProgStudent.CSEPhD ?? null, label: 'CSE PhD Students' },
              ],
              innerRadius: 40,
              paddingAngle: 1,
              cornerRadius: 5,
            },
          ]}
          width={550}
          height={220}
        />

        </div>

        <div className='flex flex-row justify-center items-center my-40'>
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: categoryFaculty.CSE, color:'green', label: 'CSE faculty' },
                { id: 1, value: categoryFaculty.ECE, color:'orange', label: 'ECE faculty' }
              ],
              innerRadius: 40,
              paddingAngle: 1,
              cornerRadius: 5,
            },
          ]}
          width={500}
          height={220}
        />
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: categorySubjects.CSE, color:'pink', label: 'CSE Subjects' },
                { id: 1, value: categorySubjects.ECE, color:'violet', label: 'ECE Subjects' }
              ],
              innerRadius: 40,
              paddingAngle: 1,
              cornerRadius: 5,
            },
          ]}
          width={500}
          height={220}
        />
        </div>
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: categoryStudents.CSE, color:'blue', label: 'CSE Students' },
                { id: 1, value: categoryStudents.ECE, color:'red', label: 'ECE Students' }
              ],
              innerRadius: 40,
              paddingAngle: 1,
              cornerRadius: 5,
            },
          ]}
          width={500}
          height={220}
        />
        
      </div>
    </div>
    </>
  );
}
