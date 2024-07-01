import { Footer } from "flowbite-react";
import NavbarComponent from '../Navbar.jsx'
import Home from '../Home.jsx';
import Form2 from '../Forms/Form2.jsx';
import AboutUs from "../AboutUs.jsx";
import Contact from "../Contact.jsx";
import { doGET, doPOST } from "../../../../utils/HttpUtil.jsx";
import { useEffect, useState } from "react";
import { getUTMParameters } from '../../../../utils/helper.js'
function LandingPage() {
  const [forms, setForms] = useState(null)
  const [loading, setLoading] = useState(false);

  const getForm = async () => {
    try {
      const response = await doGET("/project/666de33f3d5ee559944dd6ad/Forms");
      setForms({
        first: response?.[0] ?? [],
        second: response?.[1] ?? [],
        third: response?.[2] ?? [],
      })
    } catch (error) {
      console.error("Error fetching form:", error);
    }
  };

  const handleSubmit = async (e, form, formData) => {
    e.preventDefault();
    try {
      setLoading(true);

      const formId = form?._id;
      const values = Object?.keys(formData)?.map(label => ({
        fieldId: form?.fields?.find(field => field?.label === label)?._id,
        value: formData[label]
      }));

      const utmParameters = getUTMParameters();

      // Send form data to backend
      let response = await doPOST("/addFormValue", { formId, values, projectId: project?._ido, utmParameters, ...(phone && { phone }) });

      // Handle response
      if (response.success) {
        console.log("Form submitted successfully:", response);
      } else {
        console.error("Error submitting form:", response.error);
      }
      return true
    } catch (error) {
      console.error("Error submitting form:", error);
      return false
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getForm()
  }, [])
  return (
    <>
      <NavbarComponent />
      <Home form={forms?.first} handleSubmit={handleSubmit} />
      <Form2 form={forms?.second} handleSubmit={handleSubmit} />
      <AboutUs />
      <Contact form={forms?.third} handleSubmit={handleSubmit} />
    </>
  );
}

export default LandingPage;
