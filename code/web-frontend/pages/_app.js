import { FormProvider } from '@/context/formContext';
import { PaymentProvider } from '@/context/paymentContext';

function MyApp({ Component, pageProps }) {
  return (
    <PaymentProvider>
    <FormProvider>
      <Component {...pageProps} />
    </FormProvider>
    </PaymentProvider>
  );
}

export default MyApp;
