module.exports = Object.freeze({
  /**Auth Constant Messages */
  SESSION_EXPIRED: "Your session has been expired please login again.",
  NEW_USER_CREATED: "Signup successfully completed with email ",
  INVITATION_EMAIL: "An Invitation email has been send to",
  LOGIN_SUCCESS: "Successful Login!",
  LOGOUT_SUCCESS: "Successfully logout!",
  ALREADY_REGISTERED: "Email already registered!",
  PHONE_VERIFIED: "Contact number successfully verified",
  EMAIL_VERIFIED: "Email successfully verified",
  INVALID_USER: "Sorry! You are not registered with BitXmi-Mop NFT.",
  EMAIL_NOT_VERIFIED:
    "Your email is not verified. Please verify first then you can signIn.",
  PHONE_NOT_VERIFIED:
    "Your contact number is not verified. Please verify first then you can signIn.",
  VERIFY_PHONE_FIRST:
    "Your contact number is not verified. Please verify first then you can able to perform this action.",
  VERIFY_EMAIL_FIRST:
    "Your email is not verified. Please verify first then you can able to perform this action.",
  GOOGLE_ENABLE_FIRST:
    "Your google two factor authenticator is not activated. Please activate first then you can able to perform this action.",
  INVALID_CREDENTIALS: "Provided credentials are incorrect, please try again.",
  RESET_PASSWORD_SUCCESS: "Your password has been changed successfully.",
  RESET_PASSWORD_ERROR: "Unable to update password, internal server error.",
  WRONG_OLD_PASSWORD:
    "You enter wrong old password. \n Please insert correct old password.",
  CODE_SENT_PHONE: "Verification code sent to your registered phone number.",
  CODE_SENT_EMAIL: "Verification code sent to your registered email address.",
  SECRET_NOT_EXIST: "Please first create google 2FA account then verify.",
  PROFILE_UPDATE: "You have successfully updated you are profile",
  ACCESS_DENIED: "Access Denied!",
  OTPMSG: "Your one time password to change credential is:",
  INVALID_OTP_TOKEN: "Invalid OTP-Token, verification failed!",
  TOKEN_ERR: "token is empty or null!",
  TOKEN_NOT_EXPIRE: "Token not expired yet",
  TOKEN_INVALID: "Token is invalid",
  EMAIL_REG_ERR: "Must provide your company email!",
  LVL_ERR: "Investor Level Required!",
  USER_BLOCKED: "Sorry! you are blocked, please contact our support team.",
  UNAUTH: "User Unauthorized!",
  OTP_TOKEN: "Please provide Google Authenticator Otp-Token.",
  INVALID_OTP_TOKEN:
    "Provided Google Authenticator Otp-Token is invalid,Please provide valid Otp-Token",

  /**NFT Created */
  NFT_COLLECTION_CREATED: "Collection created successfully.",
  NFT_FEATURE_ADDED: "Feature added successfully.",
  ADDRESS_REQ: "Wallet address is required.",

  /**General Messages */
  SUCCESS: "success",
  EMAILS_SENT: "Emails has been sent!",
  SMS_SENT: "SMS has been sent!",
  SERVER_ERROR:
    "Internal server error.\nPlease try again or contact with our suport team.",
  NO_RECORD: "No record found",
  NOT_UPDATED: "Record Not updated, Please Try again.",
  NOT_MODIFY: "Record Not Modified, Please Try again.",
  /**Roles constants */
  JWTERROR: "TokenExpiredError",
  ACTIVE: "active",
  BLOCK: "blocked",
  FITSTAR_BUCKET: {
    user: "users",
    sponsor: "sponsors",
    blog: "blogs",
    collaborator: "collaborators",
    landing: "landing",
    ambassador: "ambassadors",
  },
  CREATE_BLOG: "Blog successfully created.",
  UPDATE_BLOG: "Blog successfully updated.",
  RETRIEVE_BLOG: "Blog successfully retrieved.",
  DELETE_BLOG: "Blog successfully deleted.",

  CREATE_COLLABORATOR: "Collaborator successfully created.",
  UPDATE_COLLABORATOR: "Collaborator successfully updated.",
  RETRIEVE_COLLABORATOR: "Collaborator successfully retrieved.",
  DELETE_COLLABORATOR: "Collaborator successfully deleted.",

  CREATE_SPONSOR: "Sponsor successfully created.",
  UPDATE_SPONSOR: "Sponsor successfully updated.",
  RETRIEVE_SPONSOR: "Sponsor successfully retrieved.",
  DELETE_SPONSOR: "Sponsor successfully deleted.",

  CREATE_AMBASSADOR: "Ambassador successfully created.",
  UPDATE_AMBASSADOR: "Ambassador successfully updated.",
  RETRIEVE_AMBASSADOR: "Ambassador successfully retrieved.",
  DELETE_AMBASSADOR: "Ambassador successfully deleted.",
});
