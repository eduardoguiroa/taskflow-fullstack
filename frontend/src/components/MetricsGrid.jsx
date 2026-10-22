import React from 'react';
import { Layers, Clock, Flame, CheckCircle2 } from 'lucide-react';

export default function MetricsGrid({ metrics }) {
  const cards = [
    {
      title: 'Total Tareas',
      value: metrics?.total ?? 0,
      icon: <Layers size={22} />,
      type: 'total',
    },
    {
      title: 'Pendientes',
      value: metrics?.pending ?? 0,
      icon: <Clock size={22} />,
      type: 'pending',
    },
    {
      title: 'En Progreso',
      value: metrics?.inProgress ?? 0,
      icon: <Flame size={22} />,
      type: 'in-progress',
    },
    {
      title: 'Completadas',
      value: metrics?.completed ?? 0,
      icon: <CheckCircle2 size={22} />,
      type: 'completed',
    },
  ];

  return (
    <section className="metrics-grid" aria-label="Métricas del sistema">
      {cards.map((card) => (
        <article key={card.type} className="metric-card" id={`metric-${card.type}`}>
          <div className="metric-info">
            <h3>{card.title}</h3>
            <span className="metric-value">{card.value}</span>
          </div>
          <div className={`metric-icon-wrapper ${card.type}`}>
            {card.icon}
          </div>
        </article>
      ))}
    </section>
  );
}
