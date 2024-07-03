import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import AppHeader from '../../../components/AppHeader/AppHeader';
import { SVG } from '../../../assets/svg';
import { useNavigation } from '@react-navigation/native';

const PrivacyPolicyScreen = () => {
  const navigation = useNavigation();

  return (
    <>
      <AppHeader
        title="Privacy Policy"
        iconLeft={<SVG.BackArrow size={24} fill={'black'} />}
        onLeftIconPress={() => navigation.goBack()}
      />
      <ScrollView style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.header}>vaishakhimatrimony.in Terms of Service</Text>
          <Text style={styles.text}>
            We welcome you to vaishakhimatrimony.in. We request you to review these Conditions of Use. To become a member of the vaishakhimatrimony.in service, you must read and accept all of the terms and conditions of this agreement and the Privacy Policy. If you do not agree to be bound by the terms after you read this Agreement, you may not use the vaishakhimatrimony.in service. You agree that we may modify the terms of this Agreement or the Privacy Policy, in our sole discretion, by posting amended terms to this Website. Your continued use of the service indicates your acceptance of the amended Terms of Service Agreement.
          </Text>
          
          <Text style={styles.header}>1. The Service</Text>
          <Text style={styles.text}>
            The Service is provided by vaishakhimatrimony.in and you understand and agree to the following:
          </Text>
          <Text style={styles.text}>
            (a) if you choose to register, you must submit a valid e-mail address and select a password and user name during the registration process;
          </Text>
          <Text style={styles.text}>
            (b) You are responsible for maintaining the confidentiality of your member name and password, and all uses of your account -- whether or not you've authorized such use;
          </Text>
          <Text style={styles.text}>
            (c) You agree to notify vaishakhimatrimony.in immediately of any unauthorized use of your account and
          </Text>
          <Text style={styles.text}>
            (d) You are at least 18 years of age.
          </Text>
          <Text style={styles.text}>
            (e) Fees once paid will not be refunded (If you wish to register as a paid member). vaishakhimatrimony.in will not be held liable for any loss or damage for non-compliance. In addition, you understand and agree that the content of all users, including your content, will be collected, aggregated and anonymously integrated into the vaishakhimatrimony.in Service and that vaishakhimatrimony.in will use aggregated data collected from you and other users for statistical and analytical reporting purposes. You understand, and agree that, unless expressly stated, vaishakhimatrimony.in in no way controls, verifies, or endorses any of the information contained on or in the vaishakhimatrimony.in service, including links, events, messages, message boards and members published listings.
          </Text>
          <Text style={styles.text}>
            (f) Divorced Candidates who seek new alliance by registering with vaishakhimatrimony.in should submit their non objection certificate issued by Church or Court of Law within 10 days of their registration, failing which their registration will be withheld without any information to the candidate.
          </Text>
          <Text style={styles.text}>
            (g) After the receipt of an id & Password by the candidate for their created profile either as a Free Member or a Paid member, to change their Date of Birth they should submit their age proof certificate to do so.
          </Text>
          <Text style={styles.text}>
            (h) All profiles, Free or Paid will be activated only after the confirmation of the submitted details by their Parents / Reference person/ Candidate himself through the given telephone numbers.
          </Text>
          <Text style={styles.text}>
            (i) Once you register with vaishakhimatrimony.in, from then, you will be getting promotional e-mails which bring the current events and functions held at vaishakhimatrimony.in for your kind information. If you do not like to receive these e-mails information's kindly unsubscribe by clicking the 'unsubscribe' link given in your received mail.
          </Text>
          <Text style={styles.text}>
            (j) All details pertaining to a Profile will be totally deleted after a period of 1 year from its expiry.
          </Text>
          <Text style={styles.text}>
            (k) All paid registrations are valid for one year/nine months/six months, or till the marriage is fixed, whichever comes first,according to the membership taken. Re-registration of these members has to be done within 30 days from its expiry. Exceeding 30 days, it will be treated as new registration only.
          </Text>
          <Text style={styles.text}>
            (l)vaishakhimatrimony.in do not involve directly in the matchmaking process of any candidates. If necessary it will only assist or guide. Matchmaking should be done by the Candidate/Parents for all categorize of registrations.
          </Text>
          <Text style={styles.text}>
            (m) All despite is subjected to Ernakulam Jurisdiction only.
          </Text>
          <Text style={styles.text}>
            (n) All profiles will be unavailable immediately after the confirmation…
          </Text>

          <Text style={styles.header}>Privacy Policy</Text>
          <Text style={styles.text}>
            https://www.vaishakhimatrimony.in is an online matrimonial portal endeavouring constantly to provide you with matrimonial services. This privacy statement is common to all the matrimonial Website/apps operated under https://www.vaishakhimatrimony.in Since we are strongly committed to your right to privacy, we have drawn out a privacy statement with regard to the information we collect from you. You acknowledge that you are disclosing information voluntarily. By accessing /using the website/apps and/or by providing your information, you consent to the collection and use of the info you disclose on the website/apps in accordance with this Privacy Policy. If you do not agree for use of your information, please do not use or access this website/apps.
          </Text>
          <Text style={styles.text}>
            Change of Privacy Policy
          </Text>
          <Text style={styles.text}>
            We may change this Privacy Policy without notice from time to time without any notice to you. However, changes will be updated in the Privacy Policy page.
          </Text>
          <Text style={styles.text}>
            How to address your Grievance:
          </Text>
          <Text style={styles.text}>
            Grievance Officer : Mrs. Jayashree Bansode
          </Text>
          <Text style={styles.text}>
            Address :
          </Text>
          <Text style={styles.text}>
            VAISHAKHI FOUNDATION AND MATRIMONY TRUST
            H.No. 19/1, Near Campbell's School,
            New Ghatge Layout,
            Afzalpur Road,
            Gulbarga
            Karnataka - 585103
          </Text>
          <Text style={styles.text}>
            Email :- vmkbansode@gmail.com
            Contact no :- +91-9448534453 +91-8792684453
          </Text>
          <Text style={styles.text}>
            The Grievance officer shall be available between 10 am to 6 pm IST from Monday to Saturday excluding Sunday's and Public Holidays in India.
          </Text>
          <Text style={styles.text}>
            The Grievance officer is appointed as per Section 5 (9) of the Information Technology ( Reasonable Security & Procedures and Sensitive Personal data or Information ) Rule, 2011.
          </Text>

          <Text style={styles.header}>Refund Policy</Text>
          <Text style={styles.text}>
            The payments made by any Vaishakhi Matrimony member by way of membership / renewal fee / auto renewal are treated as non-refundable.
          </Text>
          <Text style={styles.text}>
            Payment once made for Vaishakhi Matrimony services cannot be assigned to any person/party or adjusted towards any other product or packages provided by the Company.
          </Text>
          <Text style={styles.text}>
            In the event you terminate your membership, you will not be entitled to a refund of any subscription fees, if any, paid by you.
          </Text>

          <Text style={styles.header}>Cancellation Policy</Text>
          <Text style={styles.text}>
            You may terminate your VAISHAKHI matrimony membership at any time, for any reason. But the payments made by member by way of registration / membership / renewal fee / auto renewal is /are treated as non-refundable.
          </Text>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  text: {
    fontSize: 14,
    marginBottom: 10,
    color: '#333',
  },
});

export default PrivacyPolicyScreen;
