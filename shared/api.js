import axios from 'axios';
url = "http://192.168.1.128:3000/api/";

export async function fetchHospitalAreas(setData, setIsLoading) {
  try {
    const response = await axios.get(url+'hosp-areas');
    const data = response.data.map(item => ({ label: item.name, value: false }));
    setData(data);
    setIsLoading(false);
    console.log("in fetch data");
    console.log(data);
  } catch (error) {
    console.error('Error fetching data', error);
    setIsLoading(false);
  }
}

export async function fetchData(setData, setIsLoading) {
    try {
      const response = await axios.get(url+'hosp-areas');
      const data = response.data.map(item => ({ label: item.name, value: false }));
      setData(data);
      setIsLoading(false);
      console.log("in fetch data");
      console.log(data);
    } catch (error) {
      console.error('Error fetching data', error);
      setIsLoading(false);
    }
  }