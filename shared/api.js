import axios from 'axios';
// url = "http://192.168.1.128:3000/api/";
// url = "http://10.101.1.39:3000/api/";
url = "http://18.220.2.233:3000/api/";
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

export async function fetchbCPAPUseLengths(setData, setIsLoadingLengths) {
  try {
    const response = await axios.get(url+'bcpap-use-lengths');
    const data = response.data.map(item => ({ label: item.length, value: item.length }));
    setData(data);
    setIsLoadingLengths(false);
    console.log("in fetch data");
    console.log(data);
  } catch (error) {
    console.error('Error fetching data', error);
    setIsLoadingLengths(false);
  }
}

export async function fetchStartbCPAPReasons(setData, setIsLoadingStartReasons) {
  try {
    const response = await axios.get(url+'start-bcpap-reasons');
    const data = response.data.map(item => ({ label: item.reason, value: false }));
    setData(data);
    setIsLoadingStartReasons(false);
    console.log("in fetch data");
    console.log(data);
  } catch (error) {
    console.error('Error fetching data', error);
    setIsLoadingStartReasons(false);
  }
}

export async function fetchStopbCPAPReasons(setData, setIsLoadingStopReasons) {
  try {
    const response = await axios.get(url+'stop-bcpap-reasons');
    const data = response.data.map(item => ({ label: item.reason, value: false }));
    setData(data);
    setIsLoadingStopReasons(false);
    console.log("in fetch data");
    console.log(data);
  } catch (error) {
    console.error('Error fetching data', error);
    setIsLoadingStopReasons(false);
  }
}

export async function fetchO2BlendingOptions(setData, setIsLoadingBlendingOptions) {
  try {
    const response = await axios.get(url+'o2-blending-options');
    const data = response.data.map(item => ({ label: item.blend, value: item.blend }));
    setData(data);
    setIsLoadingBlendingOptions(false);
    console.log("in fetch data");
    console.log(data);
  } catch (error) {
    console.error('Error fetching data', error);
    setIsLoadingBlendingOptions(false);
  }
}

export async function fetchHospitals(setData, setIsLoadingHospitals) {
  try {
    const response = await axios.get(url+'getHospitals');
    const data = response.data.map(item => ({
      label: `${item.name} | ${item.city}`,
      value: item.id,
      lastQuestionAsked: item.LastQuestionAsked
    }));
    setData(data);
    setIsLoadingHospitals(false);
    console.log("in fetch data");
    console.log(data);
  } catch (error) {
    console.error('Error fetching data', error);
    setIsLoadingHospitals(false);
  }
}

export async function addHospital(hospital) { //I don't think that the loading use state is necessary for posts
  try {
    const response = await axios.post(url+'postHospitals', hospital);
    console.log(response.data.message);
   // setIsLoadingHospitals(false);
  } catch (error) {
    console.error('Error adding hospital', error);
   // setIsLoadingHospitals(false);
  }
}

export async function fetchPatientInterfaces(setData, setIsLoading) {
  try {
    const response = await axios.get(url+'getPatientInterfaces');
    const data = response.data.map(item => ({ label: item.interface, value: item.interface }));
    setData(data);
    setIsLoading(false);
    console.log("in fetch data");
    console.log(data);
  } catch (error) {
    console.error('Error fetching data', error);
    setIsLoading(false);
  }
}

export async function fetchHumidificationOptions(setData, setIsLoadingOptions) {
  try {
    const response = await axios.get(url+'humidification-options');
    const data = response.data.map(item => ({ label: item.humidOption, value: item.humidOption }));
    setData(data);
    setIsLoadingOptions(false);
    console.log("in fetch data");
    console.log(data);
  } catch (error) {
    console.error('Error fetching data', error);
    setIsLoadingOptions(false);
  }
}


export async function submitPatientData(patientData) {
  try {
    // Submit patient data to the server
    await axios.post(url + 'submitPatient', patientData);
    console.log('Patient data submitted successfully');
    // Navigate to the welcome page
    // ...
  } catch (error) {
    console.error('Error submitting patient data:', error);
    // Handle error (e.g., show an error message)
  }
}

export async function addHospitalData(data) {
  try {
    const response = await axios.post(url+'add-hospital-data', data);
    console.log(response.data);
  } catch (error) {
    console.error('Error adding hospital data', error);
  }
}




