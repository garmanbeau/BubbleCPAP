import styled from "styled-components/native";

      const Container = styled.View`
        max-width: 400px;
        margin: 20px auto 0 auto;
        padding: 40px;
        `;


         const ProgressBar = styled.View`
            display: flex;
            flex-direction: row;
            width: 300px;
            margin: 0 auto;
            margin-bottom: 40px;
            justify-content: space-between;
            align-items: flex-end;
        `; 

    const Step = styled.View`
                text-align: center;
                margin: auto 10px;
                //justify-content: center;
                align-items: center;
            `;
    
     const Bullet = styled.View`
        height: 20;
        width: 20;
        //width: auto;
        border-radius: 100%;
        border: 1px solid #28a745;
        color: ${(props)=> 
            props.variant ==='outline' ? 'white' : '#28a745'};
        display: inline-block;
        position: relative;
        background-color: ${(props)=> 
            props.variant ==='outline' ? '#28a745' : 'white'};
    `;
     const BulletCompleted = styled.View`
        color: white;
        background-color: #28a745;
        height: 20;
        width: auto;
        border-radius: 100%;
        border: 1px solid #28a745;
        display: inline-block;
        position: relative;
    `;
     const BulletCompletedAfter = styled.View`
        &:after{
          content: "";
          position: absolute;
          height: 5;
          width: 54px;
          background-color: #28a745;
        }
    `;
        const StepText = styled.Text`
        margin-bottom: 1;
        color: #28a745;
    `;

        const FancyButton = styled(Bullet).attrs((props) =>({
            type: 'submit'
        }))`
            background-color:red;
        `

    export {Container, ProgressBar, Step, Bullet, BulletCompleted, BulletCompletedAfter, StepText, FancyButton};
