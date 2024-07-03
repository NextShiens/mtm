import React from 'react';
import { ScrollView, Text, StyleSheet, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SVG } from '../../../assets/svg';

const SectionHeader = ({ title }) => (
  <Text style={styles.sectionHeader}>{title}</Text>
);

const Paragraph = ({ children }) => (
  <Text style={styles.paragraph}>{children}</Text>
);

const ListItem = ({ children }) => (
  <View style={styles.listItem}>
    <Text style={styles.listItemDot}>•</Text>
    <Text style={styles.listItemText}>{children}</Text>
  </View>
);

const PrivacyPolicyScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <SVG.BackArrow size={24} fill="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.mainTitle}>vaishakhimatrimony.in Terms of Service</Text>

          <Paragraph>
            We welcome you to vaishakhimatrimony.in. We request you to review these Conditions of Use. To become a member of the vaishakhimatrimony.in service, you must read and accept all of the terms and conditions of this agreement and the Privacy Policy. If you do not agree to be bound by the terms after you read this Agreement, you may not use the vaishakhimatrimony.in service. You agree that we may modify the terms of this Agreement or the Privacy Policy, in our sole discretion, by posting amended terms to this Website. Your continued use of the service indicates your acceptance of the amended Terms of Service Agreement.
          </Paragraph>

          <SectionHeader>1. The Service</SectionHeader>
          <Paragraph>
            The Service is provided by vaishakhimatrimony.in and you understand and agree to the following:
          </Paragraph>

          <ListItem>If you choose to register, you must submit a valid e-mail address and select a password and user name during the registration process;</ListItem>
          <ListItem>You are responsible for maintaining the confidentiality of your member name and password, and all uses of your account -- whether or not you've authorized such use;</ListItem>
          <ListItem>You agree to notify vaishakhimatrimony.in immediately of any unauthorized use of your account;</ListItem>
          <ListItem>You are at least 18 years of age.</ListItem>
          <ListItem>Fees once paid will not be refunded (If you wish to register as a paid member). vaishakhimatrimony.in will not be held liable for any loss or damage for non-compliance.</ListItem>
          <ListItem>Divorced Candidates who seek new alliance by registering with vaishakhimatrimony.in should submit their non objection certificate issued by Church or Court of Law within 10 days of their registration, failing which their registration will be withheld without any information to the candidate.</ListItem>
          <ListItem>After the receipt of an id & Password by the candidate for their created profile either as a Free Member or a Paid member, to change their Date of Birth they should submit their age proof certificate to do so.</ListItem>
          <ListItem>All profiles, Free or Paid will be activated only after the confirmation of the submitted details by their Parents / Reference person/ Candidate himself through the given telephone numbers.</ListItem>
          <ListItem>Once you register with vaishakhimatrimony.in, from then, you will be getting promotional e-mails which bring the current events and functions held at vaishakhimatrimony.in for your kind information. If you do not like to receive these e-mails information's kindly unsubscribe by clicking the 'unsubscribe' link given in your received mail.</ListItem>
          <ListItem>All details pertaining to a Profile will be totally deleted after a period of 1 year from its expiry.</ListItem>
          <ListItem>All paid registrations are valid for one year/nine months/six months, or till the marriage is fixed, whichever comes first, according to the membership taken. Re-registration of these members has to be done within 30 days from its expiry. Exceeding 30 days, it will be treated as new registration only.</ListItem>
          <ListItem>vaishakhimatrimony.in do not involve directly in the matchmaking process of any candidates. If necessary it will only assist or guide. Matchmaking should be done by the Candidate/Parents for all categorize of registrations.</ListItem>
          <ListItem>All despite is subjected to Ernakulam Jurisdiction only.</ListItem>
          <ListItem>All profiles will be unavailable immediately after the confirmation of marriage.</ListItem>

          <SectionHeader>Privacy Policy</SectionHeader>
          <Paragraph>
            https://www.vaishakhimatrimony.in is an online matrimonial portal endeavouring constantly to provide you with matrimonial services. This privacy statement is common to all the matrimonial Website/apps operated under https://www.vaishakhimatrimony.in Since we are strongly committed to your right to privacy, we have drawn out a privacy statement with regard to the information we collect from you. You acknowledge that you are disclosing information voluntarily. By accessing /using the website/apps and/or by providing your information, you consent to the collection and use of the info you disclose on the website/apps in accordance with this Privacy Policy. If you do not agree for use of your information, please do not use or access this website/apps.
          </Paragraph>

          <SectionHeader>Change of Privacy Policy</SectionHeader>
          <Paragraph>
            We may change this Privacy Policy without notice from time to time without any notice to you. However, changes will be updated in the Privacy Policy page.
          </Paragraph>

          <SectionHeader>How to address your Grievance:</SectionHeader>
          <Paragraph>
            Grievance Officer : Mrs. Jayashree Bansode
          </Paragraph>
          <Paragraph>
            Address :
          </Paragraph>
          <Paragraph>
            VAISHAKHI FOUNDATION AND MATRIMONY TRUST
            H.No. 19/1, Near Campbell's School,
            New Ghatge Layout,
            Afzalpur Road,
            Gulbarga
            Karnataka - 585103
          </Paragraph>
          <Paragraph>
            Email :- vmkbansode@gmail.com
            Contact no :- +91-9448534453 +91-8792684453
          </Paragraph>
          <Paragraph>
            The Grievance officer shall be available between 10 am to 6 pm IST from Monday to Saturday excluding Sunday's and Public Holidays in India.
          </Paragraph>
          <Paragraph>
            The Grievance officer is appointed as per Section 5 (9) of the Information Technology ( Reasonable Security & Procedures and Sensitive Personal data or Information ) Rule, 2011.
          </Paragraph>

          <SectionHeader>Refund Policy</SectionHeader>
          <Paragraph>
            The payments made by any Vaishakhi Matrimony member by way of membership / renewal fee / auto renewal are treated as non-refundable.
          </Paragraph>
          <Paragraph>
            Payment once made for Vaishakhi Matrimony services cannot be assigned to any person/party or adjusted towards any other product or packages provided by the Company.
          </Paragraph>
          <Paragraph>
            In the event you terminate your membership, you will not be entitled to a refund of any subscription fees, if any, paid by you.
          </Paragraph>

          <SectionHeader>Cancellation Policy</SectionHeader>
          <Paragraph>
            You may terminate your VAISHAKHI matrimony membership at any time, for any reason. But the payments made by member by way of registration / membership / renewal fee / auto renewal is /are treated as non-refundable.
          </Paragraph>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
    color: '#333333',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333333',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 12,
    color: '#333333',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
    color: '#333333',
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingLeft: 16,
  },
  listItemDot: {
    fontSize: 16,
    marginRight: 8,
    color: '#333333',
  },
  listItemText: {
    fontSize: 16,
    flex: 1,
    color: '#333333',
  },
});

export default PrivacyPolicyScreen;