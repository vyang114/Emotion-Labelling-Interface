import './CreatePerson.css';

import { useEffect, useState } from 'react'
import { Button, Flex, Text, TextField, SelectField } from '@aws-amplify/ui-react';
import { Select } from 'react-select'
import { DataStore } from '@aws-amplify/datastore';
import { Person } from './models';

// await DataStore.save(
//   new Person({
//   "image": "Lorem ipsum dolor sit amet",
//   "boxColour": "Lorem ipsum dolor sit amet",
//   "physicalSignal":  /* Provide init commands */,
//   "socialIdentity":  /* Provide init commands */,
//   "emotion": "Lorem ipsum dolor sit amet",
//   "socialRelation":  /* Provide init commands */,
//   "environment": "Lorem ipsum dolor sit amet"
//   "caption": "Lorem ipsum dolor sit amet"
// })
// );

const physicalSignFacial = require('./physicalSignFacial.json');
const physicalSignBody = require('./physicalSignBody.json');

export default function CreatePerson ({ imageSrc }) {

  var image = imageSrc
  const maleNames = ["Greg", "Jack", "Lucas", "Sean", "Terry"];
  const femaleNames = ["Chloe", "Jane", "Nancy", "Sophia", "Wendy"];
  const boxColourToName = [
    {boxColour: "Aqua", sex: "Female", name: "Zoe"},
    {boxColour: "Aqua", sex: "Male", name: "Alan"},
    {boxColour: "Black", sex: "Female", name: "Marie"},
    {boxColour: "Black", sex: "Male", name: "Oscar"},
    {boxColour: "Blue", sex: "Female", name: "Nora"},
    {boxColour: "Blue", sex: "Male", name: "Ronald"},
    {boxColour: "Brown", sex: "Female", name: "Rhea"},
    {boxColour: "Brown", sex: "Male", name: "Jimmy"},
    {boxColour: "Dark Green", sex: "Female", name: "Joann"},
    {boxColour: "Dark Green", sex: "Male", name: "Ollie"},
    {boxColour: "Gray", sex: "Female", name: "Rhonda"},
    {boxColour: "Gray", sex: "Male", name: "Evan"},
    {boxColour: "Green", sex: "Female", name: "Beth"},
    {boxColour: "Green", sex: "Male", name: "Karl"},
    {boxColour: "Light Blue", sex: "Female", name: "Maddie"},
    {boxColour: "Light Blue", sex: "Male", name: "Charlie"},
    {boxColour: "Light Pink", sex: "Female", name: "Linda"},
    {boxColour: "Light Pink", sex: "Male", name: "Brett"},
    {boxColour: "Maroon", sex: "Female", name: "Lia"},
    {boxColour: "Maroon", sex: "Male", name: "Adam"},
    {boxColour: "Olive", sex: "Female", name: "Molly"},
    {boxColour: "Olive", sex: "Male", name: "Jasper"},
    {boxColour: "Orange", sex: "Female", name: "Amber"},
    {boxColour: "Orange", sex: "Male", name: "Willy"},
    {boxColour: "Pink", sex: "Female", name: "Isabel"},
    {boxColour: "Pink", sex: "Male", name: "Robin"},
    {boxColour: "Purple", sex: "Female", name: "Carol"},
    {boxColour: "Purple", sex: "Male", name: "Marvin"},
    {boxColour: "Red", sex: "Female", name: "Mia"},
    {boxColour: "Red", sex: "Male", name: "Alec"},
    {boxColour: "Teal", sex: "Female", name: "Poppy"},
    {boxColour: "Teal", sex: "Male", name: "Simon"},
    {boxColour: "White", sex: "Female", name: "Lilly"},
    {boxColour: "White", sex: "Male", name: "Jared"},
    {boxColour: "Yellow", sex: "Female", name: "Rachel"},
    {boxColour: "Yellow", sex: "Male", name: "Zack"},
    {boxColour: "None", sex: "Female", name: "a female"},
    {boxColour: "None", sex: "Male", name: "a male"},
  ]

  const [boxColour, setBoxColour] = useState('Red')
  const [physicalSignal, setPhysicalSignal] = useState([])
  const [socialIdentity, setSocialIdentity] = useState({age: "Child", sex: "Female", occupation: ""})
  const [socialRelation, setRelation] = useState([])
  const [socialInteraction, setInteraction] = useState([])
  // const [environment, setEnvironment] = useState([{ time: "", location: "" }])
  const [environment, setEnvironment] = useState("")
  const [otherEmotion, setOtherEmotion] = useState("Anger")
  const [emotion, setEmotion] = useState('Anger')
  // const [caption, setCaption] = useState('')
  const [checked, setChecked] = useState([]);
  const [isShown, setIsShown] = useState(false);
  const [isShownBody, setIsShownBody] = useState(false);
  const [name, setName] = useState("Chloe")
  
   // Add/Remove checked item from list
   const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
    setPhysicalSignal(updatedList)
  };

  // Return classes based on whether item is checked
  const isChecked = (item) =>
    checked.includes(item) ? "checked-item" : "not-checked-item";

  // Generate string of checked items
  const checkedItems = checked.length
  ? checked.reduce((total, item) => {
    // console.log(total, item)
      return total + ", " + item;
    })
  : "";

  // Generate string of checked items
  const captionSocialIdentity = `${name} is a(n) ${socialIdentity.sex} ${socialIdentity.age}. `;
  const captionOccupation = socialIdentity.occupation !== "" ? `${name}` + " is a(n) " + `${socialIdentity.occupation}. ` : "";
  const captionPhysicalSignal = checked.length > 0 ? `${name} is or has ${checkedItems}. ` : "";
  const captionSocialRelation = socialRelation.length > 0 ? 
   socialRelation.map((item) => {
    return `${name} is ${boxColourToName.filter(x => x.boxColour === item.name && x.sex === item.sex).map(x => x.name)}'s ${item.relationship} and ${name} is ${item.interaction} them. `;
    }): ""
  const captionEvironment = environment !== "" ? `${name}'s physical evironment is ${environment}. ` : "";
  const caption = captionSocialIdentity + captionOccupation + captionPhysicalSignal + `${captionSocialRelation}`.replace(",", "") + captionEvironment + ` ${name} is likely to be feeling {placeholder}?`;

  
  const handleClick = (event) => {
    // toggle shown state
    setIsShown(current => !current);
  };

  const handleClickBody = (event) => {
    // toggle shown state
    setIsShownBody(current => !current);
  };

  const handleSubmit0 = async e => {
    e.preventDefault()

    const entity = {
      image,
      boxColour,
      physicalSignal,
      socialIdentity,
      emotion,
      socialRelation,
      environment,
      caption,
    }

    console.log(entity)
      
    const newEntity = await DataStore.save(
        new Person(entity)
    )

    alert('Submitted for ' + boxColour + " box." );

    // console.log("0", entity, emotion)
    setBoxColour("Red");
    setPhysicalSignal([]);
    setSocialIdentity({age: "Child", sex: "Female", occupation: ""});
    setOtherEmotion("Anger");
    setRelation([]);
    setEnvironment("");
    setChecked([]);
    setIsShown(false);
    setIsShownBody(false);
  }

  useEffect(() => {
      setEmotion(otherEmotion);
      // console.log("emotion", emotion)
  },[otherEmotion]);

  const handleSubmit1 = async e => {
    e.preventDefault()

    const entity = {
      image,
      boxColour,
      physicalSignal,
      socialIdentity,
      emotion,
      socialRelation,
      environment,
      caption,
    }

    console.log(entity)
      
    const newEntity = await DataStore.save(
        new Person(entity)
    )

    alert('Submitted for ' + boxColour + "." );

    // console.log("1", entity, emotion)
    setBoxColour("Red");
    setPhysicalSignal([]);
    setSocialIdentity({age: "Child", sex: "Female", occupation: ""});
    setOtherEmotion("Anger");
    setRelation([]);
    setChecked([]);
    setIsShown(false);
    setIsShownBody(false);
  }

  const handleSubmit = async e => {
      e.preventDefault()

      const entity = {
        image,
        boxColour,
        physicalSignal,
        socialIdentity,
        emotion,
        socialRelation,
        environment,
        caption,
      }

      console.log(entity)
      
      // const newEntity = await DataStore.save(
      //     new Person(entity)
      // )

      // alert('Submitted for ' + boxColour + "." );

        setBoxColour("Red");
        setPhysicalSignal([]);
        setSocialIdentity([]);
        setOtherEmotion("");
        setRelation([]);
        setInteraction([]);
  };


  const handlePhysicalSignalNameChange = idx => evt => {
      const newPhysicalSignal = physicalSignal.map((physicalSignal, sidx) => {
        if (idx !== sidx) return physicalSignal;
        return { ...physicalSignal, item: evt.target.value };
      });
  
      setPhysicalSignal(newPhysicalSignal);
    };
  
  const handleAddPhysicalSignal = () => {
      setPhysicalSignal(physicalSignal.concat([{ item: "" }]));
    };
  
  const handleRemovePhysicalSignal = idx => () => {
      setPhysicalSignal(physicalSignal.filter((s, sidx) => idx !== sidx));
    };

  const handleAge = evt => {
      setSocialIdentity({...socialIdentity, age: evt.target.value});
  };

  const handleSex = evt => {
    setSocialIdentity({...socialIdentity, sex: evt.target.value});
    if(evt.target.value === "Female"){
      let random = Math.floor(Math.random() * femaleNames.length);
      // console.log(random, femaleNames[random]);
      setName(femaleNames[random])
    }else{
      let random = Math.floor(Math.random() * maleNames.length);
      setName(maleNames[random])
    };
  };


  const handleOccupation = evt => {
    setSocialIdentity({...socialIdentity, occupation: evt.target.value});
  };

  const handleSocialIdentityNameChange = idx => evt => {
      const newSocialIdentity = socialIdentity.map((socialIdentity, sidx) => {
          if (idx !== sidx) return socialIdentity;
          return { ...socialIdentity, item: evt.target.value };
      });

      setSocialIdentity(newSocialIdentity);
      };

  const handleAddSocialIdentity = () => {
      setSocialIdentity(socialIdentity.concat([{ item: "" }]));
      };

  const handleRemoveSocialIdentity = idx => () => {
      setSocialIdentity(socialIdentity.filter((s, sidx) => idx !== sidx));
      };
      
  const handleRelationNameChange = idx => evt => {
      const newRelationName = socialRelation.map((rel, sidx) => {
        if (idx !== sidx) return rel;
        return { ...rel, name: evt.target.value };
      });
  
      setRelation(newRelationName);
    };

  const handleRelationRelationshipChange = idx => evt => {
      const newRelationRelationship = socialRelation.map((rel, sidx) => {
        if (idx !== sidx) return rel;
        return { ...rel, relationship: evt.target.value };
      });
  
      setRelation(newRelationRelationship);
    };


  const handleRelationSexChange = idx => evt => {
    const newRelationRelationship = socialRelation.map((rel, sidx) => {
      if (idx !== sidx) return rel;
      return { ...rel, sex: evt.target.value };
    });

    setRelation(newRelationRelationship);
  };
  
  const handleRelationInteractionChange = idx => evt => {
    const newRelationRelationship = socialRelation.map((rel, sidx) => {
      if (idx !== sidx) return rel;
      return { ...rel, interaction: evt.target.value };
    });

    setRelation(newRelationRelationship);
  };

  const handleAddRelation = () => {
      setRelation(socialRelation.concat([{ name: "Aqua", sex: "Female", relationship: "",  interaction: ""}]));
    };
  
  const handleRemoveRelation = idx => () => {
      setRelation(socialRelation.filter((s, sidx) => idx !== sidx));
    };

  const handleInteractionNameChange = idx => evt => {
    const newInteractionName = socialInteraction.map((int, sidx) => {
      if (idx !== sidx) return int;
      return { ...int, name: evt.target.value };
    });

    setInteraction(newInteractionName);
  };

  const handleInteractionInteractionChange = idx => evt => {
      const newInteractionInteraction = socialInteraction.map((rel, sidx) => {
        if (idx !== sidx) return rel;
        return { ...rel, interaction: evt.target.value };
      });
  
      setInteraction(newInteractionInteraction);
    };

  const handleInteractionSexChange = idx => evt => {
      const newInteractionInteraction = socialInteraction.map((rel, sidx) => {
        if (idx !== sidx) return rel;
        return { ...rel, sex: evt.target.value };
      });
  
      setInteraction(newInteractionInteraction);
    };
  
  const handleAddInteraction = () => {
    setInteraction(socialInteraction.concat([{ name: "Aqua", sex: "Female", interaction: "" }]));
    };
  
  const handleRemoveInteraction = idx => () => {
    setInteraction(socialInteraction.filter((s, sidx) => idx !== sidx));
    };

  return (
    <form>
        <div className='course-item-text'>
          <h4>Image Name.</h4>
            <div className='inputField' >
            {imageSrc}
            </div>
        </div>
        <div>
          <h4>Choose the box colour of the person.
            <Text as="span" fontSize="0.8rem" color="red">
              {' '}
              *Required
            </Text>
          </h4>
          <Text as="span" fontSize="0.8rem" color="black">
              {' '}
              <i>Select None if no box in the image.</i>
          </Text>
          <div className='inputField' >
            <select 
                    name="boxColour"
                    value={boxColour}
                    onChange={e => setBoxColour(e.target.value)}>
                    <option value="Aqua">Aqua</option>
                    <option value="Black">Black</option>
                    <option value="Blue">Blue</option>
                    <option value="Brown">Brown</option>
                    <option value="Dark Green">Dark Green</option>
                    <option value="Gray">Gray</option>
                    <option value="Green">Green</option>
                    <option value="Light Blue">Light Blue</option>
                    <option value="Light Pink">Light Pink</option>
                    <option value="Maroon">Maroon</option>
                    <option value="Olive">Olive</option>
                    <option value="Orange">Orange</option>
                    <option value="Pink">Pink</option>
                    <option value="Purple">Purple</option>
                    <option value="Red">Red</option>
                    <option value="Teal">Teal</option>
                    <option value="White">White</option>
                    <option value="Yellow">Yellow</option>
                    <option value="None">None</option>
                </select>
                <Text as="span" fontSize="1rem" color="red">
                    {' '}
                  </Text>
              <img src={"/"+`${boxColour}`+".png"} alt="image" width="20" height="20"/>
          </div>
        </div>
        <div className='inputField'>
            <h4>Describe the person in the {boxColour} box.</h4>
            <Text as="span" fontSize="0.8rem" color="black">
              {' '}
              <i>Leave Occupation empty if unsure.</i><br />
            </Text>
            Age
              <select name="socialIdentity"
                value={socialIdentity.age}
                onChange={handleAge}
                placeholder={'Please select'}>
                <option value="Child">Child (0-12)</option>
                <option value="Adolescent">Adolescent (13-17)</option>
                <option value="Adult">Adult (18-64)</option>
                <option value="Elder">Elder (65+)</option>
              </select>
              &nbsp;&nbsp;Sex
              <select name="socialIdentity"
                value={socialIdentity.sex}
                onChange={handleSex}
                placeholder={'Please select'}>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
              &nbsp;&nbsp;Occupation
              <input
                    type="text"
                    placeholder={`Doctor, Soccer player`}
                    value={socialIdentity.occupation}
                    onChange={handleOccupation}
                    />
          </div>
          <div className='inputField'>
            <h4>{name} is in the {boxColour} box. What is {name} doing in the image?</h4>
            <Text as="span" fontSize="0.8rem" color="black">
                  {' '}
                  <i>Click the buttons to show/hide options. Select all that apply.</i>
                </Text>
            <div>
              <button type ="button" onClick={handleClick}>Show/hide facial signals</button>
              {isShown ? (
                <div>
                  {physicalSignFacial.map((item, index) => (
                  <div key={index}>
                    <input type="checkbox" value={item.value} onChange={handleCheck} checked={checked.includes(item.value)}></input>
                    <span className={isChecked(item.value)}>{item.label}</span>
                  </div>
                ))}
                </div>
              ) : null}
            </div>
            <div>
              <button type ="button" onClick={handleClickBody}>Show/hide body signals</button>
              {isShownBody ? (
                <div>
                  {physicalSignBody.map((item, index) => (
                  <div key={index}>
                    <input type="checkbox" value={item.value} onChange={handleCheck} checked={checked.includes(item.value)}></input>
                    <span className={isChecked(item.value)}>{item.label}</span>
                  </div>
                ))}
                </div>
              ) : null}
            </div>
          <div>
            {`Signals selected are: ${checkedItems}`}
          </div>
          </div>
          <div>
            <h4>
              What is the emotion that {name} is most likely to be feeling?
                <Text as="span" fontSize="0.8rem" color="red">
                  {' '}
                  *Required
                </Text>
            </h4>
            <div className='inputField'>
            <select 
                  name="emotion"
                  value={otherEmotion}
                  onChange={e => setOtherEmotion(e.target.value)}>
                  <option value="Anger">Anger</option>
                  <option value="Annoyance">Annoyance</option>
                  <option value="Aversion">Aversion</option>
                  <option value="Confusion">Confusion</option>
                  <option value="Disapproval">Disapproval</option>
                  <option value="Disconnection">Disconnection</option>
                  <option value="Disquietment">Disquietment</option>
                  <option value="Embarrassment">Embarrassment</option>
                  <option value="Fatigue">Fatigue</option>
                  <option value="Fear">Fear</option>
                  <option value="Pain - Physical">Pain - Physical</option>
                  <option value="Pain - Emotional">Pain - Emotional</option>
                  <option value="Sadness">Sadness</option>
                  <option value="Suffering - Physical">Suffering - Physical</option>
                  <option value="Suffering - Emotional">Suffering - Emotional</option>
                  <option value="Others">Others</option>
              </select>  
              {otherEmotion === "Others" ? <div><Text as="span" fontSize="0.8rem" color="red">
                    Please specify
                    {' '}
                  </Text><TextField onChange={e => setEmotion(e.target.value)}></TextField></div>: null} 
            </div>
          </div>
          <div>
            <h4>What is {name}'s relationship with others in the image?</h4>
            <h4>Who is {name} to them?</h4>
            <h4>How is {name} interacting with them?</h4>
            <Text as="span" fontSize="0.8rem" color="black">
                {' '}
                <i>Click add to add as many entries as you observe. Click delete to delete an entry.</i>
              </Text>
            <div className='inputField'>
            {socialRelation.map((relation, idx) => (
                <div className="socialRelation">
                    <select 
                        type="select"
                        value={relation.name}
                        onChange={handleRelationNameChange(idx)}>
                        <option value="Aqua">Aqua</option>
                        <option value="Black">Black</option>
                        <option value="Blue">Blue</option>
                        <option value="Brown">Brown</option>
                        <option value="Dark Green">Dark Green</option>
                        <option value="Gray">Gray</option>
                        <option value="Green">Green</option>
                        <option value="Light Blue">Light Blue</option>
                        <option value="Light Pink">Light Pink</option>
                        <option value="Maroon">Maroon</option>
                        <option value="Olive">Olive</option>
                        <option value="Orange">Orange</option>
                        <option value="Pink">Pink</option>
                        <option value="Purple">Purple</option>
                        <option value="Red">Red</option>
                        <option value="Teal">Teal</option>
                        <option value="White">White</option>
                        <option value="Yellow">Yellow</option>
                        <option value="None">None</option>
                    </select>
                    &nbsp;
                    <img src={"/"+`${relation.name}`+".png"} alt="image" width="20" height="20"/>
                    &nbsp; Sex
                    <select
                    value={relation.sex}
                    onChange={handleRelationSexChange(idx)}>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                  </select>
                  &nbsp; Relation
                    <input
                        type="text"
                        placeholder={`Daughter, Doctor, Coach`}
                        value={relation.relationship}
                        onChange={handleRelationRelationshipChange(idx)}
                        />
                   &nbsp; Interaction
                    <input
                        type="text"
                        placeholder={`Staring at him, Pointing at her`}
                        value={relation.interaction}
                        onChange={handleRelationInteractionChange(idx)}
                        />
                    <button
                        type="button"
                        onClick={handleRemoveRelation(idx)}
                        className="small"
                        >
                        Delete
                        </button>
                  <p>{name} is {boxColourToName.filter(x => x.boxColour === relation.name && x.sex === relation.sex).map(x => x.name)}'s {relation.relationship} and {name} is {relation.interaction} them.</p>
                </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddRelation}
                  className="small"
                  >
                  Add a relation and interaction
                </button>
            </div>
          </div>
          {/* <div>
            <h4>Who is {name} interacting with and how?</h4>
            <Text as="span" fontSize="0.8rem" color="black">
              {' '}
              <i>Click add to add as many entries as you observe. Click delete to delete an entry.</i>
            </Text>
            <div className='inputField'>
            {socialInteraction.map((interaction, idx) => (
                <div className="socialInteraction">
                    <select 
                        type="select"
                        value={interaction.name}
                        onChange={handleInteractionNameChange(idx)}>
                        <option value="Aqua">Aqua</option>
                        <option value="Black">Black</option>
                        <option value="Blue">Blue</option>
                        <option value="Brown">Brown</option>
                        <option value="Dark Green">Dark Green</option>
                        <option value="Gray">Gray</option>
                        <option value="Green">Green</option>
                        <option value="Light Blue">Light Blue</option>
                        <option value="Light Pink">Light Pink</option>
                        <option value="Maroon">Maroon</option>
                        <option value="Olive">Olive</option>
                        <option value="Orange">Orange</option>
                        <option value="Pink">Pink</option>
                        <option value="Purple">Purple</option>
                        <option value="Red">Red</option>
                        <option value="Teal">Teal</option>
                        <option value="White">White</option>
                        <option value="Yellow">Yellow</option>
                    </select>
                    &nbsp;
                    <img src={"/"+`${interaction.name}`+".png"} alt="image" width="20" height="20"/>
                    &nbsp; Sex
                    <select
                    value={interaction.sex}
                    onChange={handleInteractionSexChange(idx)}>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                  </select>
                  &nbsp; Interaction
                    <input
                        type="text"
                        placeholder={`Staring at him, Pointing at her`}
                        value={interaction.interaction}
                        onChange={handleInteractionInteractionChange(idx)}
                        />
                    <button
                        type="button"
                        onClick={handleRemoveInteraction(idx)}
                        className="small"
                        >
                        Delete
                        </button>
                </div>
                ))}
                <button
                    type="button"
                    onClick={handleAddInteraction}
                    className="small"
                    >
                    Add a Social Interaction
                  </button>
            </div>
           </div> */}
           <div>
            <h4>Describe {name}'s physical surrounding.</h4>
            <Text as="span" fontSize="0.8rem" color="black">
              {' '}
              <i>Ex: Time, Location, Event, Nearby objects.</i>
            </Text>
            <div className='inputField'>
                <textarea
                  value={environment}
                  rows={4}
                  cols={40}
                  placeholder={"Short description of physical environment. Ex: Sunny day in a jungle, Family dinner on Christmas Eve at home"}
                  onChange={e => setEnvironment(e.target.value)}
                />
            </div>
          </div>
          <h4>Caption generated.</h4>
          <div>
            {`${caption}`}
          </div>
          <p>===============</p>
          <p>{name} is a(n) {socialIdentity.age} and {socialIdentity.sex}.</p>
          {socialIdentity.occupation !== "" ? (<p>{name} is a(n) {socialIdentity.occupation}.</p>):null}
          {physicalSignal.length > 0 ? <p>{name} is or has {checkedItems}.&nbsp;</p> : null}
          {socialRelation.length > 0 ? <p>
            { socialRelation.map((rel) => {
              return <span>{name} is {boxColourToName.filter(x => x.boxColour === rel.name && x.sex === rel.sex).map(x => x.name)}'s {rel.relationship} and {name} is {rel.interaction} them. </span>;
              })}</p> : null}
          {name} is likely to be feeling {emotion}.
          <div>
          <button type='submit' onClick={handleSubmit0}>Submit</button>
          &nbsp;&nbsp;&nbsp;
          <button type='submit' onClick={handleSubmit1}>Submit & re-use values for another box</button>
          </div>
      </form>
  )

}