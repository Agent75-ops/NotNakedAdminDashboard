import styled from "styled-components";
import { useEffect, useState } from "react";
import {ErrorMessage} from "../../../../components/Input/input";
import FormDefaultSection from "../../../../components/FormDefaultSection/form-default-section";

const Container = styled.div`
flex:1;
`
const ImageInputContainer = styled.label`
width: 100%;
border-radius: 50%;
aspect-ratio: 1/1;
overflow: hidden;
position: relative;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
border:3px dashed var(--main-color);
`

const CategoryImage = styled.img`
border-radius:6px;
position:relative;
width:100%;
height:100%;
object-fit:cover;
`
const PlusIcon = styled.i`
position: absolute;
color:var(--main-color);
font-size:var(--heading-3);
z-index: 0;
`

const HiddenImageInput = styled.input`
visibility: hidden;
width: .2px;
position: absolute;
`

export default function MediaSection({errors, formResetClicked}){
    const [userImageUrl, setUserImageUrl] = useState('');

    useEffect(()=>{
        if (formResetClicked)
        setUserImageUrl('');
    },[formResetClicked])

    function handleCategoryImageInputChange(e){
        setUserImageUrl(URL.createObjectURL(e.currentTarget.files[0]))
    }

    return(
        <Container>
            <FormDefaultSection style={{padding:"0",boxShadow:"none"}} title={"User Profile Picture"} subtitle={"represents the user (optional)"}>
                <ImageInputContainer htmlFor="user_profile_picture">
                    <PlusIcon className="fa-solid fa-plus" />
                    {userImageUrl && <CategoryImage src={userImageUrl} />}
                    <HiddenImageInput accept=".jpg,.jpeg,.png" 
                    onChange={handleCategoryImageInputChange} 
                    id="user_profile_picture" type="file" name="profile_picture"/>
                </ImageInputContainer>
                {errors?.messages['profile_picture'] && <ErrorMessage>{errors.messages['profile_picture']}</ErrorMessage>}
            </FormDefaultSection>
        </Container>
    )
}