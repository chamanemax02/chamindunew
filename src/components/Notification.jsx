import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotification } from '../context/NotificationContext';
import { CheckCircle, AlertCircle, X, Info } from 'lucide-react';

const Notification = () => {
    const { notifications, removeNotification } = useNotification();

    return (
        <div style={{
            position: 'fixed',
            top: '30px',
            right: '30px',
            zIndex: 10000,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            pointerEvents: 'none'
        }}>
            <AnimatePresence>
                {notifications.map((n) => (
                    <motion.div
                        key={n.id}
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                        style={{
                            background: 'rgba(15,15,15,0.8)',
                            backdropFilter: 'blur(20px)',
                            border: `1px solid ${n.type === 'error' ? 'rgba(255,107,107,0.3)' : 'rgba(0,255,163,0.3)'}`,
                            padding: '16px 20px',
                            borderRadius: '16px',
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                            minWidth: '300px',
                            maxWidth: '400px',
                            pointerEvents: 'auto'
                        }}
                    >
                        <div style={{ color: n.type === 'error' ? '#ff6b6b' : 'var(--primary)' }}>
                            {n.type === 'error' ? <AlertCircle size={20} /> : <CheckCircle size={20} />}
                        </div>
                        <p style={{ fontSize: '0.85rem', fontWeight: '600', flex: 1 }}>{n.message}</p>
                        <button
                            onClick={() => removeNotification(n.id)}
                            style={{ opacity: 0.5, background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
                            className="hover:opacity-100"
                        >
                            <X size={16} />
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default Notification;
