import React from 'react';
import { motion } from 'framer-motion';
import { Construction } from 'lucide-react';
import './Maintenance.css';

const Maintenance: React.FC = () => {
  const dots = React.useMemo(() => 
    [...Array(6)].map(() => ({
      x: Math.random() * 50 - 25,
      duration: 5 + Math.random() * 5,
      delay: Math.random() * 5,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    })), []
  );

  return (
    <div className="maintenance-container">
      <div className="maintenance-background">
        <div className="grid-overlay"></div>
      </div>

      <motion.div 
        className="maintenance-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="logo-wrapper">
          <motion.img 
            src="/Logo.webp" 
            alt="Rethink3D" 
            className="maintenance-logo"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2
            }}
          />
        </div>

        <motion.h1 
          className="maintenance-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Rethink<span>3D</span>
        </motion.h1>

        <motion.div 
          className="status-badge"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Construction size={16} />
          <span>EM MANUTENÇÃO</span>
        </motion.div>

        <motion.h2 
          className="maintenance-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Estamos aprimorando sua experiência
        </motion.h2>

        <motion.p 
          className="maintenance-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          O site da Rethink3D está passando por uma manutenção programada para trazer novas funcionalidades e melhorias. Voltaremos em breve!
        </motion.p>

        <div className="footer-links">
          <p>Siga-nos para atualizações:</p>
          <div className="social-handle">
            <span>@_rethink3d</span>
          </div>
        </div>
      </motion.div>
      
      <div className="floating-elements">
        {dots.map((dot, i) => (
          <motion.div
            key={i}
            className="floating-dot"
            animate={{
              y: [0, -100, 0],
              x: [0, dot.x, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: dot.duration,
              repeat: Infinity,
              delay: dot.delay
            }}
            style={{
              left: dot.left,
              top: dot.top,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Maintenance;
