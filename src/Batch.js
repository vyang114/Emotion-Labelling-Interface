import logo from './logo.svg';
import file from './uniqueImageName.txt'
import './App.css';

import { DataStore } from '@aws-amplify/datastore';
import { Storage } from "@aws-amplify/storage"
import { Person } from './models';
import { useEffect, useState } from 'react';

import ReactPaginate from 'react-paginate';
import CreatePerson from './CreatePerson';

function Batch() {

//   const batches = [
//     {batch: 1},
//     {batch: 2},
//     {batch: 3},
//     {batch: 61}
//   ]
    const batches = require('./batchList.json');
    const someImages = require('./data.json');
//   console.log(someImages);

//   const someImages = [
//     {"title": 'labelme_crjcqqxpmoznjzz_1.jpg', "boxNum": '1', "batch": 2},
//     {"title": 'labelme_fpqubxfwifldqao_3.jpg', "boxNum": '3', "batch": 2},
//     {"title": 'labelme_wqnscyafmdgxnwn_1.jpg', "boxNum": '1', "batch": 61},
//     {"title": 'sun_amsdoadjqexyriyz_1.jpg', "boxNum": '1', "batch": 61},
//     {"title": 'sun_bmapgnwjeolgfhdv_1.jpg', "boxNum": '2', "batch": 61},
//   ]

  const [somePosts, setSomePosts] = useState([])

  // const [posts, setPosts] = useState([
  //   {key: 'Anger/mscoco/COCO_val2014_000000579056_1.jpg', title: 'COCO_val2014_000000579056_1.jpg', boxNum: 1, batch: 61},
  //   {key: 'Anger/mscoco/COCO_val2014_000000578492_1.jpg', title: 'COCO_val2014_000000578492_1.jpg', boxNum: 1, 'batch': 61},
  //   {key: 'Anger/mscoco/COCO_val2014_000000516893_2.jpg', title: 'CCOCO_val2014_000000516893_2.jpg', boxNum: 2, 'batch': 61}]);
  const [posts, setPosts] = useState([]);
  const [images, setImages] = useState([]);
  const [batch, setBatch] = useState(1)

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(1);

  const imageURL = []
  const temp = []

  fetch(file)
  .then(r => r.text())
  // .then(text => {
    // console.log('text decoded:', text.split('\n'));
    // let boxNum = text.split('\n')
    //         .split('.')
    //         .shift()
    //         .slice(-1);
      // console.log('text decoded:');
    // setPosts(text.split('\n'))
  // });

  const handleBatchChange = e => {
    setBatch(e.target.value);
  }

  const result = someImages.filter(obj => {
    return obj.batch === parseInt(batch)
  })

  useEffect(() => {
    setSomePosts(result)
    // console.log("posts", parseInt(batch), somePosts)
  }, [batch])

  useEffect(() => {

    function processStorageList(response) {

      let files = [];
      let folders = new Set();
      response.results.forEach(res => {
        if (res.size) {
          let title = res.key
          .split('/').pop()
          res.title = title

          let boxNum = title
          .split('.')
          .shift()
          .slice(-1);
          res.boxNum = boxNum
          // console.log(res)
          files.push(res);
          // sometimes files declare a folder with a / within then
          let possibleFolder = res.key
            .split('/')
            .slice(0, -1)
            .join('/');
          if (possibleFolder) folders.add(possibleFolder);
        } else {
          folders.add(res.key);
        }
      });
      return { files, folders };
    }

    const getData = async () => {
      const response = await fetch("https://q34hr8zxth.execute-api.ca-central-1.amazonaws.com/dev/", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        redirect: 'follow'
      });
      // .then(response => response.text())
      // .then(result => alert(JSON.parse(result).body))
      // .catch(error => console.log('error', error))

      const data = await response.json();
      temp.push(data.body)
      // const obj = JSON.parse(data.body);
    }

    const listFiles = async () => {
      // const anger = await Storage.list('Anger/') // for listing ALL files without prefix, pass '' instead
  //     //   .then((result) => console.log(result))
  //     //   .catch((err) => console.log(err));
  //     // console.log(file.results)

      const file = await Storage.list('Disconnection/') // for listing ALL files without prefix, pass '' instead
      setPosts(processStorageList(file).files)
    };

    listFiles()

  }, [])

  
  useEffect(() => {

    const getImageURL = async () => {
      console.log("Before loop");

      for(let index = 0; index < somePosts.length; index++) {
          const image = await Storage.get("all/"+somePosts[index].title, {
          level: "public"
        });
        // console.log(posts[index].key,)
        // console.log(<img src={`${image}`} alt="image not found" width="500" height="500"/>)
        // imageURL.push(<div><img src={`${image}`} alt="image not found" width="500" height="500"/><h3>{posts[index].title}</h3></div>)

        let data = {
          title: somePosts[index].title,
          source: image,
          boxNum: somePosts[index].boxNum,
        }
        
        imageURL.push(data)
        // setImages(imageURL)
        // console.log("In loop")
      }
      setImages(imageURL)
      console.log("After loop")
      // console.log(imageURL)
    };
    getImageURL()

  }, [somePosts]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = images.slice(indexOfFirstPost, indexOfLastPost);

  var currentPostTitle = ""

  const paginate = ({ selected }) => {
		setCurrentPage(selected + 1);
	};

  // useEffect(() => {
  //   const querySubmission = async () => {
  //     const file = await DataStore.query(Person, p => p.image.eq(currentPosts.title)) // for listing ALL files without prefix, pass '' instead
  //   };

  //   querySubmission()

  // }, []);

  return (
    <div className="container">
      <div className="blog-content-section">
        <div className="container-grid">
            <div >
              <select value={batch} onChange={handleBatchChange}>
              {batches.map((item) => {return (<option key={item.batch} value={item.batch}>Batch {item.batch}</option>)})}
              </select>
              <h4>Batch {batch} has 100 images.</h4>
              <br />
                {currentPosts.map((currentPost) => {
                    currentPostTitle = currentPost.title;
                return (
                  <div className="blog-post" key={currentPost.title}>
                    <img className="cover-img" src={currentPost.source} alt="image not found" />
                    {/* <h4 className="title">Image Name</h4> */}
                    {/* <h4 className="description">{currentPost.title}</h4> */}
                  </div>)
                })}
            </div>
          <div className='col-2'>
            <CreatePerson
              imageSrc={currentPostTitle}
            />
          </div>
        </div>
        <ReactPaginate
          onPageChange={paginate}
          pageCount={Math.ceil(images.length / postsPerPage)}
          previousLabel={'Prev'}
          nextLabel={'Next'}
          containerClassName={'pagination'}
          pageLinkClassName={'page-number'}
          previousLinkClassName={'page-number'}
          nextLinkClassName={'page-number'}
          activeLinkClassName={'active'}
          />
      </div>
    </div>
  
  );
}

export default Batch;
