


export default function AboutUs() {
  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', marginTop:'20px'}}>
      <h1>🌱 Acerca de Nosotros</h1>

      <section style={{textAlign: 'left', margin: '20px', display:'flex', flexDirection:'row'   }}>
      <img src= "https://i.postimg.cc/PfBszYrD/mercart.png"  alt="DevShop Logo" className="about-logo" style={{height:'420px',width:'450px', margin:'10px', borderRadius:'25px'}} />
      <p style={{fontSize:'20px', margin:'10px', textAlign:'justify', lineHeight:'1.6', alignContent:'center', width:'60%'}}>
Somos una plataforma de e-commerce apasionada por la tecnología, la innovación y el bienestar de nuestros clientes. Nos especializamos en ofrecer productos tecnológicos de alta calidad, además de artículos de moda y estilo de vida, todo con un enfoque amigable con el medio ambiente. <br />Creemos que comprar en línea debe ser una experiencia cómoda, confiable y humana.</p>
      </section>

<section style={{display:'flex',flexDirection:'column', justifyContent:'space-around', margin:'20px'}}>
    <div style={{margin:'20px', textAlign:'center'}}>
        <h1>Nuestra misión </h1>
        <div style={{display:'flex', flaxdirection:'row', justifyContent:'space-around', alignContent:'center'}}>
            <p style={{fontSize:'20px', margin:'10px', textAlign:'justify', lineHeight:'1.6', width:'100%',alignContent:'center'}}>
                Brindar a nuestros clientes una experiencia de compra excepcional, ofreciendo productos tecnológicos y de consumo cuidadosamente seleccionados, con un trato cálido y personalizado, promoviendo prácticas responsables con el medio ambiente.</p>

            <img src="https://i.postimg.cc/GmxWCfPP/mision.jpg" alt="DevShop Logo" className="about-logo" style={{height:'350px',width:'480px', margin:'10px', borderRadius:'25px'}} />
        </div>
    </div>
    <div style={{margin:'20px', textAlign:'center'}}>
        <h1>Nuestra visión</h1>
        <div style={{display:'flex', flaxdirection:'row', justifyContent:'space-around', alignContent:'center'}}>
            <img src= "https://i.postimg.cc/t4jK8b6C/vision.jpg"  alt="DevShop Logo" className="about-logo" style={{height:'320px', margin:'10px', borderRadius:'25px'}} />
            <p style={{fontSize:'20px', margin:'10px', textAlign:'justify', lineHeight:'1.6', alignContent:'center', width:'100%'}}>Ser la plataforma líder en comercio electrónico que redefine la relación entre tecnología, sostenibilidad y cercanía humana, creando una comunidad de clientes que se sientan valorados, cómodos y conectados.</p>
        </div>
     </div>
</section>
    </div>
  );
}


