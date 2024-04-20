import React from 'react'

const page = () => {
  return (
    <div className="container mx-auto p-5 text-gray-800">
      <h1 className="text-3xl font-bold">Terms and Conditions</h1>
      <p className="mt-4">
        By using the BookBounty website, you confirm that you
        have read, understood, and agree to these terms and conditions.
        BookBounty reserves the right to modify these terms at any time. Please
        review regularly to ensure you are aware of any changes. If you disagree
        with these terms, you should not use this website.
      </p>

      {/* License section */}
      <h2 className="text-2xl font-bold mt-5">License to Use Website</h2>
      <p className="mt-2">
        You are granted a limited license to use the BookBounty website for
        personal use. This license does not include permission to download
        (except page caching), modify, or reproduce any part of the website; use
        data mining tools; or use the website's content outside the scope of
        intended personal use without express written consent from BookBounty.
      </p>

      {/* Account and Security section */}
      <h2 className="text-2xl font-bold mt-5">Account and Security</h2>
      <p className="mt-2">
        You are responsible for maintaining the confidentiality of your account
        details and are liable for all activities under your account. BookBounty
        reserves the right to terminate your account if you are found to be in
        breach of these terms.
      </p>

      {/* Privacy section */}
      <h2 className="text-2xl font-bold mt-5">Privacy</h2>
      <p className="mt-2">
        Your privacy is important to us. BookBounty's privacy policy is
        incorporated into these terms by reference and governs our use of your
        personal information. By using this site, you consent to the data
        practices described in our privacy policy.
      </p>

      {/* Intellectual Property section */}
      <h2 className="text-2xl font-bold mt-5">Intellectual Property</h2>
      <p className="mt-2">
        All content on BookBounty's website, including text, graphics, logos,
        and images, is the property of BookBounty or its content suppliers and
        protected by international copyright and trademark laws.
      </p>

      {/* Pricing and Availability section */}
      <h2 className="text-2xl font-bold mt-5">Pricing and Availability</h2>
      <p className="mt-2">
        Prices and availability of products on our website are subject to change
        without notice. Errors in pricing may occur, and we reserve the right to
        cancel any orders arising from such errors.
      </p>

      {/* Product Descriptions section */}
      <h2 className="text-2xl font-bold mt-5">Product Descriptions</h2>
      <p className="mt-2">
        BookBounty tries to be as accurate as possible. However, we do not
        warrant that product descriptions or other content is accurate,
        complete, reliable, or error-free. If a product offered by BookBounty is
        not as described, your sole remedy is to return it in unused condition.
      </p>

      {/* Disclaimer of Warranties and Limitation of Liability section */}
      <h2 className="text-2xl font-bold mt-5">
        Disclaimer of Warranties and Limitation of Liability
      </h2>
      <p className="mt-2">
        BookBounty provides this website on an "as is" and "as available" basis.
        We make no representations or warranties of any kind, express or
        implied, as to the operation of this website or the information,
        content, materials, or products included on this site.
      </p>

      {/* Applicable Law section */}
      <h2 className="text-2xl font-bold mt-5">Applicable Law</h2>
      <p className="mt-2">
        By visiting BookBounty, you agree that the laws of your location,
        without regard to principles of conflict of laws, will govern these
        Terms of Use and any dispute of any sort that might arise between you
        and BookBounty.
      </p>

      {/* Site Policies, Modification, and Severability section */}
      <h2 className="text-2xl font-bold mt-5">
        Site Policies, Modification, and Severability
      </h2>
      <p className="mt-2">
        Please review our other policies posted on this site. These policies
        also govern your visit to BookBounty. We reserve the right to make
        changes to our site, policies, and these Terms of Use at any time. If
        any of these conditions shall be deemed invalid, void, or for any reason
        unenforceable, that condition shall be deemed severable and shall not
        affect the validity and enforceability of any remaining condition.
      </p>
    </div>
  )
}

export default page
