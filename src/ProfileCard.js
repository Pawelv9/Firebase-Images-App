import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FileInput from 'react-file-input';
import { storage, database } from './firebase';

import './ProfileCard.css';

class ProfileCard extends Component {
  constructor(props) {
    super(props);
    
    this.storageRef = storage.ref('/user-images').child(props.uid);
    this.userRef = database.ref('/users').child(props.uid);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit(event) {
    const file = event.target.files[0];
    const uploadTask = this.storageRef.child( file.name )
    .put(file, {contentType: file.type});
    console.log(this.userRef.child("photoURL"));
    console.log(file);
    
    // uploadTask.on('stage_changed', (snapshot) => {
      //   console.log(snapshot.bytesTransferred / snapshot.totalBytes * 100 + '%');
      // });
      
      console.log(uploadTask);
      
      uploadTask.then((snapshot) => {
        console.log(snapshot);
        this.userRef.child('photoURL').set(snapshot.getDownloadURL);
      });
    }

  render() {
    const { displayName, photoURL } = this.props.user;
    return (
      <article className="ProfileCard">
        <img 
          className="ProfileCard--photo"
          src={ photoURL }
        />
        <h3> { displayName } </h3>
        <FileInput
        accept = ".png,.gif,.jpg"
        placeholder="Select an image"
        onChange={this.handleSubmit}          
        />
      </article>
    );
  }
}

ProfileCard.propTypes = {
  displayName: PropTypes.string,
  email: PropTypes.string,
  imageName: PropTypes.string,
  imageURL: PropTypes.string,
  photoURL: PropTypes.string,
  uid: PropTypes.string
};

export default ProfileCard;
