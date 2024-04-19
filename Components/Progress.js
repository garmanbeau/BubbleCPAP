import { View, Text } from 'react-native'
import React from 'react'
import styled from "styled-components/native"
import {Container, ProgressBar, Step, Bullet, BulletCompleted, BulletCompletedAfter, StepText, FancyButton} from './ProgressImport'

export default function Progress(props) {
//      const Container = styled.View`
//      max-width: 400px;
//      margin: 20px auto 0 auto;
//      padding: 40px;
//  `;
    // const ProgressBar = styled.View`
    //     display: flex;
    //     flex-direction: row;
    //     width: 300px;
    //     margin: 0 auto;
    //     margin-bottom: 40px;
    //     justify-content: space-between;
    //     align-items: flex-end;
    // `;

    // const Step = styled.View`
    //     text-align: center;
    // `;
    // const Bullet = styled.View`
    //     height: 20;
    //     width: auto;
    //     border-radius: 100%;
    //     border: 1px solid #28a745;
    //     color: ${(props)=> 
    //         props.variant ==='outline' ? 'white' : '#28a745'};
    //     display: inline-block;
    //     position: relative;
    //     background-color: ${(props)=> 
    //         props.variant ==='outline' ? '#28a745' : 'white'};
    // `;
    // const BulletCompleted = styled.View`
    //     color: white;
    //     background-color: #28a745;
    //     height: 20;
    //     width: auto;
    //     border-radius: 100%;
    //     border: 1px solid #28a745;
    //     display: inline-block;
    //     position: relative;
    // `;
    // const BulletCompletedAfter = styled.View`
    //     &:after{
    //       content: "";
    //       position: absolute;
    //       height: 5;
    //       width: 54px;
    //       background-color: #28a745;
    //     }
    // `;
    // const StepText = styled.Text`
    //     margin-bottom: 1;
    //     color: #28a745;
    // `;
   
  return (
    <Container>
        {/* <View>{props.name}</View> */}
        <ProgressBar>
            
            <Step>
                <StepText>Hospital Select</StepText>
                <Bullet variant={props.completed1}>1</Bullet>
                {/* <Bullet variant='outline'>1</Bullet> */}
            </Step>
            <Step>
                <StepText>Patient Page 1</StepText>
                <Bullet variant={props.completed2}>2</Bullet>
            </Step>
            <Step>
                <StepText>Patient Page 2</StepText>
                <Bullet variant={props.completed3}>3</Bullet>
            </Step>
            <Step>
                <StepText>Patient Page 3</StepText>
                <Bullet variant={props.completed4}>4</Bullet>
            </Step>
        </ProgressBar>
    </Container>
   
  )
}



