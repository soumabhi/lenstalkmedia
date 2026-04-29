import React from 'react';
import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';
import { useApi } from '../../hooks/useApi';
import { ClientLogo } from '../../types';

const ClientLogos = () => {
  const { data: clients } = useApi<ClientLogo>('clients', { publicOnly: true });

  if (clients.length === 0) return null;

  // Filter published clients and sort by order
  const displayClients = clients
    .filter(c => c.published !== false)
    .sort((a, b) => a.order - b.order);

  // Only enable marquee if we have enough logos
  const isMarquee = displayClients.length >= 6;

  const LogoItem = ({ client }: { client: ClientLogo }) => {
    const content = (
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="relative flex-shrink-0 px-4 sm:px-8 md:px-12 py-4"
      >
        <img
          src={client.logoUrl}
          alt={client.name || 'Client Logo'}
          className="h-12 xs:h-16 sm:h-20 md:h-24 lg:h-28 w-auto object-contain opacity-100 transition-all duration-500 cursor-pointer"
          referrerPolicy="no-referrer"
        />
      </motion.div>
    );

    if (client.websiteUrl) {
      return (
        <a 
          href={client.websiteUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block"
        >
          {content}
        </a>
      );
    }

    return content;
  };

  return (
    <div className="w-full overflow-hidden">
      <div className="relative overflow-hidden py-6 sm:py-10 md:py-14 flex items-center justify-center">
        {isMarquee ? (
          <Marquee 
            speed={60} 
            gradient={false} 
            pauseOnHover={true}
            className="flex items-center"
          >
            {displayClients.map((client, i) => (
              <LogoItem key={client.id || i} client={client} />
            ))}
          </Marquee>
        ) : (
          <div className="flex flex-wrap justify-center items-center px-4 sm:px-10">
            {displayClients.map((client, i) => (
              <motion.div
                key={client.id || i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <LogoItem client={client} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientLogos;
