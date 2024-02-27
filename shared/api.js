import axios from 'axios';
//url = "http://192.168.1.128:3000/api/";
url = "http://10.101.1.22:3000/api/";

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

export async function fetchNursePatientRatios(setData, setIsLoading) {
  try {
    const response = await axios.get(url+'nurse-patient-ratios');
    const data = response.data.map(item => ({ label: item.ratio, value: item.ratio }));
    setData(data);
    setIsLoading(false);
    console.log("in fetch data");
    console.log(data);
  } catch (error) {
    console.error('Error fetching data', error);
    setIsLoading(false);
  }
}

export async function fetchSexAtBirth(setData, setIsLoading) {
  try {
    const response = await axios.get(url+'sex-at-birth');
    const data = response.data.map(item => ({ label: item.sex, value: item.sex }));
    setData(data);
    setIsLoading(false);
    console.log("in fetch data");
    console.log(data);
  } catch (error) {
    console.error('Error fetching data', error);
    setIsLoading(false);
  }
}

export async function fetchbCPAPTypes(setData, setIsLoading) {
  try {
    const response = await axios.get(url+'bcpap-types');
    const data = response.data.map(item => ({ label: item.type, value: item.type }));
    setData(data);
    setIsLoading(false);
    console.log("in fetch data");
    console.log(data);
  } catch (error) {
    console.error('Error fetching data', error);
    setIsLoading(false);
  }
}

export async function fetchOxygenSources(setData, setIsLoading) {
  try {
    const response = await axios.get(url+'oxygen-sources');
    const data = response.data.map(item => ({ label: item.source, value: item.source }));
    setData(data);
    setIsLoading(false);
    console.log("in fetch data");
    console.log(data);
  } catch (error) {
    console.error('Error fetching data', error);
    setIsLoading(false);
  }
}

export async function fetchPatientOutcomes(setData, setIsLoadingOutcomes) {
  try {
    const response = await axios.get(url+'patient-outcomes');
    const data = response.data.map(item => ({ label: item.outcome, value: false }));
    setData(data);
    setIsLoadingOutcomes(false);
    console.log("in fetch data");
    console.log(data);
  } catch (error) {
    console.error('Error fetching data', error);
    setIsLoadingOutcomes(false);
  }
}

export async function fetchbCPAPComplications(setData, setIsLoadingComplications) {
  try {
    const response = await axios.get(url+'bcpap-complications');
    const data = response.data.map(item => ({ label: item.complication, value: false }));
    setData(data);
    setIsLoadingComplications(false);
    console.log("in fetch data");
    console.log(data);
  } catch (error) {
    console.error('Error fetching data', error);
    setIsLoadingComplications(false);
  }
}

