export async function getServerSideProps() {
    return {
      redirect: {
        destination: "https://yoga.innerspiritphoto.com",
        permanent: false, // Set to true for 308 (permanent) redirect
      },
    };
  }
  
  export default function ThankYou() {
    // This component will never render because the redirect happens first
    return null;
  }
  