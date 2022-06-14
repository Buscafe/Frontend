import styled from 'styled-components'

export const StylesCarousel = styled.div`
  section.slider{
    padding: auto;
  }

  .slider {
    position: relative;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  video {
    width: 75%;
    height: 50%;
    background-color: red;
    border-radius: 10px;
    display: flex ;
    justify-content: center;
    align-items: center;
    margin-left: 12%;
  }

  .right-arrow {
    position: absolute;
    top: 50%;
    right: 1%;
    font-size: 3rem;
    color: #000;
    z-index: 10;
    cursor: pointer;
    user-select: none;
  }

  .left-arrow {
    position: absolute;
    top: 50%;
    left: 1%; 
    font-size: 3rem;
    color: #000;
    z-index: 10;
    cursor: pointer;
    user-select: none;
  }

  .slide {
    opacity: 0;
    transition-duration: 1s ease;
  }

  .slide.active {
    opacity: 1;
    transition-duration: 1s;
    transform: scale(1.08);
  }
`