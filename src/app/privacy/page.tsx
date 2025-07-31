export default function Privacy() {
  return (
    <div className="p-[20px] flex flex-col gap-[20px]">
      <h1 className="text-[28px]">Privacy Policy</h1>
      <p>
        <strong>Effective Date:</strong> 31.7.2025
      </p>
      <p>
        <strong>iwaiter service</strong> ("we", "our", or "us") operates the{" "}
        <strong>iwaiter service</strong> mobile application (the "App"). This
        Privacy Policy explains how we collect, use, and protect your
        information when you use our App.
      </p>

      <div>
        <h2 className="text-[20px] font-semibold">Information We Collect</h2>
        <p>
          We only collect the username and password that we provide to you for
          accessing the App. No additional personal or device information is
          collected.
        </p>
      </div>
      <div>
        <h2 className="text-[20px] font-semibold">
          How We Use Your Information
        </h2>
        <p>We use the username and password to:</p>
        <ol className=" list-disc ml-[30px] mt-[5px]">
          <li>Authenticate your access to the App.</li>
          <li>Ensure the security and functionality of the App.</li>
        </ol>
      </div>

      <div>
        <h2 className="text-[20px] font-semibold">Sharing Your Information</h2>
        <p>
          We do not sell, trade, or rent your username and password to third
          parties. However, we may share your information with:
        </p>
        <ol className=" list-disc ml-[30px] mt-[5px]">
          <li>Authorities if required by law.</li>
        </ol>
      </div>

      <div>
        <h2 className="text-[20px] font-semibold">Data Security</h2>
        <p>
          We implement reasonable security measures to protect your username and
          password. However, no method of transmission over the internet or
          electronic storage is 100% secure.
        </p>
      </div>

      <div>
        <h2 className="text-[20px] font-semibold">Children's Privacy</h2>
        <p>
          Our App is not intended for children under 13. We do not knowingly
          collect personal information from children under 13. If we become
          aware that we have collected such information, we will delete it.
        </p>
      </div>

      <div>
        <h2 className="text-[20px] font-semibold">
          Changes to This Privacy Policy
        </h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify
          you of any changes by posting the new Privacy Policy on this page.
        </p>
      </div>
      <div>
        <h2 className="text-[20px] font-semibold">Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us
          at: <strong>digital-waiter-service@gmail.com</strong>
        </p>
      </div>
    </div>
  );
}
