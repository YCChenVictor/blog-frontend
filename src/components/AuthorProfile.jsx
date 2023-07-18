import headImg from '../assets/img/head.jpeg'

const AuthorProfile = () => {
  return (
    <div className="prose bg-gray-400 p-4">
      <div className="text-center text-indigo">
        <img className="mx-auto p-4 rounded-full" src={headImg} alt="author profile" />
        <p className="text-5xl font-bold">YCChen</p>
        <p className="text-gray-500 pb-4">Software Engineer</p>
      </div>
      <div className="px-32 text-left text-indigo font-mono">
        <p>
          Hello and welcome to my personal blog! Have fun and have a good day! I was born and raised in Taiwan, and I've always had a passion for software. I graduated from National Taiwan University with a degree in economics, and I am now working as a software engineer.
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
      <div className='text-center'>
        <a href={'https://github.com/YCChenVictor'} target="_blank" rel="noopener noreferrer">
          <button className="bg-white text-blueGray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
            <i className="fab fa-github"></i>
          </button>
        </a>
        <a href={'https://github.com/YCChenVictor'} target="_blank" rel="noopener noreferrer">
          <button className="bg-white text-blueGray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
            <i className="fab fa-github"></i>
          </button>
        </a>
      </div>
      {/* Include the social-media component */}
      {/* <SocialMedia /> */}
    </div>
  );
};

export default AuthorProfile;
  