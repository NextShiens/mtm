import {StyleSheet} from 'react-native';
import {COLORS, HORIZON_MARGIN} from '../../../assets/theme';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  heading: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    width: '85%',
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: 40,
  },
  planCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedPlanCard: {
    backgroundColor: '#1E285F',
  },
  planName: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
  },
  planPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#F97B22',
    marginTop: 10,
  },
  featuresContainer: {
    marginBottom: 15,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  featureIcon: {
    marginRight: 10,
    color: '#FFA500',
    backgroundColor: '#F97B221A',
    padding: 2,
    borderRadius: 20,
    paddingHorizontal: 5,
  },
  featureText: {
    fontSize: 14,
    color:'#333'
  },
  selectButton: {
    backgroundColor: '#F97B221A',
    borderRadius: 25,
    padding: 10,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: 'white',
  },
  selectButtonText: {
    color: '#F97B22',
    fontWeight: 'bold',
  },
  selectedButtonText: {
    color: '#1E285F',
  },
  selectedText: {
    color: 'white',
  },
  continueButton: {
    backgroundColor: '#F97B22',
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});