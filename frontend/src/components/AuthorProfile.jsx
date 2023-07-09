const AuthorProfile = () => {
  return (
    <div className="mx-auto text-center prose bg-gray-400 p-4">
      <div className="mx-auto text-center prose prose-indigo">
        <div>
          <img className="headPhoto" src={`../assets/img/head.jpeg`} alt="author profile image" />
          <h1>YCChen</h1>
        </div>
        <p className="text-gray-500 pb-4">Software Engineer</p>
        <div className="px-32 text-left">
          <p>
            Hello and welcome to my personal blog! Have fun and have a good day!
            {/* I was born and raised in Taiwan, and I've always had a passion for <a href={`${site.baseurl}/self/2023/02/04/software.html`}>software</a>. */}
            {/* You can explore more in <a href={`${site.baseurl}/explore`} className="text-gray-200 hover:text-black px-0.5 py-0.5 lg:py-1 mx-auto">here</a>. */}
            I graduated from National Taiwan University with a degree in economics, and I am now working as a software engineer.
          </p>
          <p>
            In my free time, you can usually find me developing websites, composing music, painting, and working out, or spending time with my family and pet. I also love to explore new topics and ideas.
          </p>
          <p>
            Through this blog, I aim to share my unique perspective on a wide range of topics, with a primary focus on the software field at present. I firmly believe in the power of knowledge and innovation to propel humanity forward, and I am dedicated to living my life in alignment with these values.
          </p>
          <p>
            Thank you for taking the time to get to know me a little better, and I look forward to connecting with you through this blog!
          </p>
        </div>
      </div>
      {/* Include the social-media component */}
      {/* <SocialMedia /> */}
    </div>
  );
};

export default AuthorProfile;
  