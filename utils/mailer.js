/** Config */
const constant = require("../constants/ConstantMessages");
const sgmail = require("@sendgrid/mail");
require("dotenv").config();
sgmail.setApiKey(process.env.SEND_GRID_KEY);

const signUpEmail = async (email) => {
  try {
    let emailObj = {
      to: email,
      from: `haris@reactivespace.com`,
      dynamic_template_data: {
        url: `${process.env.BASE_URL}`,
      },
      template_id: `${process.env.TEMPLATE_ID_SIGNUP}`,
    };
    let smsSuccess = await sgmail.send(emailObj);
    console.log("Signup Email Response:", smsSuccess);
    return true;
  } catch (error) {
    console.log("SignUp MAIL ERROR::::::::", error.response.body);
    return error;
  }
};

const contactUsEmail = async (data) => {
  const { from, to, subject, message } = data;
  try {
    let object = {
      to: to,
      from: `haris@reactivespace.com`, // later remove --> from 
      subject: subject,
      html: `<p>${message}</p>`,
     
    };
    let sendEmail = await sgmail.send(object);
    console.log("Response:::", sendEmail);
  } catch (error) {
    return error;
  }
};

module.exports = {
  signUpEmail,
  contactUsEmail,
};
