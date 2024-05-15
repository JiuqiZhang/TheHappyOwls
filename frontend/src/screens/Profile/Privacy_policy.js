import React from "react"
import { View, Text,StyleSheet, TouchableOpacity, SafeAreaView } from "react-native"

export default PolicyScreen = ({ navigation }) => {
   
    return(<View style={styles.container}>
    <Text>
    Privacy Policy


This Privacy Policy ("Policy") applies to TPSI, and TPSI Technology LLC ("Company") and

governs data collection and usage. For the purposes of this Privacy Policy, unless otherwise noted,

all references to the Company include tpsiapp.com. The Company's application is a Happy Hour

information display application. By using the Company application, you consent to the data

practices described in this statement.


Collection of your Personal Information

In order to better provide you with products and services offered, the Company may collect

personally identifiable information, such as your:



If you purchase the Company's products and services, we collect billing and credit card

information. This information is used to complete the purchase transaction.


The Company may also collect anonymous demographic information, which is not unique to you,

such as your:



We do not collect any personal information about you unless you voluntarily provide it to us.

However, you may be required to provide certain personal information to us when you elect to use

certain products or services. These may include: (a) registering for an account; (b) entering a

sweepstakes or contest sponsored by us or one of our partners; (c) signing up for special offers

from selected third parties; (d) sending us an email message; (e) submitting your credit card or

other payment information when ordering and purchasing products and services. To wit, we will

use your information for, but not limited to, communicating with you in relation to services and/or

products you have requested from us. We also may gather additional personal or non
-
personal

information in the future.


Use of your Personal Information

The Company collects and uses your personal information in the following ways: 


-
First and last name

-
Email address

-
Phone number

-
Age

-
Gender

-
to operate and deliver the services you have requested

-
to provide you with information, products, or services that you request from us

-
to provide you with notices about your account

-
to carry out the Company's obligations and enforce our rights arising from any contracts entered between you and us, including for billing and collection

-
to notify you about changes to our TPSI or any products or services we offer or provide through it

The Company may also use your personally identifiable information to inform you of other

products or services available from the Company and its affiliates.


Sharing Information with Third Parties

The Company does not sell, rent, or lease its customer lists to third parties.


The Company may share data with trusted partners to help perform statistical analysis, send you

email or postal mail, provide customer support, or arrange for deliveries. All such third parties are

prohibited from using your personal information except to provide these services tothe Company,

and they are required to maintain the confidentiality of your information.


The Company may disclose your personal information, without notice, if required to do so by law

or in the good faith belief that such action is necessary to: (a) conform to the edicts of the law or

comply with legal process served on the Company or the site; (b) protect and defend the rights or

property of the Company; and/or (c) act under exigent circumstances to protect the personal

safety of users of the Company, or the public.


Right to Deletion

Subject to certain exceptions set out below, on receipt of a verifiable request from you, we will:



Please note that we may not be able to comply with requests to delete your personal information if

it is necessary to:



Children Under Thirteen

The Company does not knowingly collect personally identifiable information from children under

the age of 13. If you are under the age of 13, you must ask your parent or guardian for permission

to use this application.


-
in any other way we may describe when you provide the information

-
for any other purpose with your consent.

-
Delete your personal information from our records; and

-
Direct any service providers to delete your personal information from their records.

-
Complete the transaction for which the personal information was collected, fulfill the terms of a written warranty or product recall conducted in accordance with federal law, and provide a good or service requested by you, or reasonably anticipated within the context of our ongoing business relationship with you, or otherwise perform a contract between you and us;

-
Detect security incidents, protect against malicious, deceptive, fraudulent, or illegal activity; or prosecute those responsible for that activity;

-
Debug to identify and repair errors that impair existing intended functionality;

-
Exercise free speech, ensure the right of another consumer to exercise his or her right of free speech, or exercise another right provided for by law;

-
Comply with the California Electronic Communications Privacy Act;

-
Engage in public or peer
-
reviewed scientific, historical, or statistical research in the public interest that adheres to all other applicable ethics and privacy laws, when our deletion of the information is likely to render impossible or seriously impair the achievement of such research, provided we have obtained your informed consent;

-
Enable solely internal uses that are reasonably aligned with your expectations based on your relationship with us;

-
Comply with an existing legal obligation; or

-
Otherwise use your personal information, internally, in a lawful manner that is compatible with the context in which you provided the information.

Disconnecting your Company's Account from Third Party Websites

You will be able to connect your Company's account to third
-
party accounts. BY

CONNECTING YOUR COMPANY'S ACCOUNT TO YOUR THIRD
-
PARTY

ACCOUNT, YOU ACKNOWLEDGE AND AGREE THAT YOU ARE CONSENTING TO

THE CONTINUOUS RELEASE OF INFORMATION ABOUT YOU TO OTHERS (IN

ACCORDANCE WITH YOUR PRIVACY SETTINGS ON THOSE THIRD
-
PARTY SITES).

IF YOU DO NOT WANT INFORMATION ABOUT YOU, INCLUDING PERSONALLY

IDENTIFYING INFORMATION, TO BE SHARED IN THIS MANNER, DO NOT USE

THIS FEATURE. You may disconnect your account from a third
-
party account at any time. TPSI

Technology LLC


Email Communications

From time to time, the Company may contact you via email for the purpose of providing

announcements, promotional offers, alerts, confirmations, surveys, and/or other general

communication. In order to improve our services, we may receive a notification when you open an

email from the Company or click on a link therein.


If you would like to stop receiving marketing or promotional communications via email from the

Company, you may opt out of such communications by clicking on the unsubscribe button..


External Data Storage Sites

We may store your data on servers provided by third
-
party hosting vendors with whom we have

contracted.


Changes to This Statement

The Company reserves the right to change this Policy from time to time. For example, when there

are changes in our services, changes in our data protection practices, or changes in the law. When

changes to this Policy are significant, we will inform you. You may receive a notice by sending an

email to the primary email address specified in your account, by placing a prominent notice on our

TPSI Technology LLC, and/or by updating any privacy information. Your continued use of the

application and/or services available after such modifications will constitute your: (a)

acknowledgment of the modified Policy; and (b) agreement to abide and be bound by that Policy.


Contact Information

The Company welcomes your questions or comments regarding this Policy. If you believe that the

Company has not adhered to this Policy, please contact the Company at:


TPSI Technology LLC

8206 Louisiana Blvd NE Ste B # 10296

Albuquerque, New Mexico 87113


Email Address:

info@tpsi.io


Phone Number:

3472576700


Effective as of February 29, 2024




    </Text>

   </View>)
}

const styles= StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginVertical: "4%",
  },
  wrapper:{
    marginVertical:'7%'
  },
  container:{
    flex:1,
    paddingTop:'17%',
    paddingHorizontal:'5%'
},
back: {
    position: "absolute",
    left: "4%",
    top: "6%",
},
email:{
     color:'grey',
      fontSize: 13
}})