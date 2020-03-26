import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logoIgm from '../../assets/logo.svg'
import { FiPower, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';
import './styles.css'

export default function Profile() {
  const history = useHistory();
  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId,
      }
    }).then(response => {
      setIncidents(response.data);
    })
  }, [ongId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId,
        }
      });

      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (err) {
      alert('Erro ao deletar caso, tente novamente.')
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoIgm} alt="Be the Hero" />
        <span>Bem vinda, {ongName}</span>

        <Link className='button' to='incidents/new'>Cadastrar novo caso</Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>
        <ul>
          {incidents.map(incident => (
            <li key={incident.id}>
              <strong>Caso:</strong>
              <p>{incident.title}</p>

              <strong>Descrição:</strong>
              <p>{incident.description}</p>

              <strong>Valor:</strong>
              <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

              <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                <FiTrash2 size={20} color="#A8A8B3" />
              </button>
            </li>
          ))}
        </ul>
      </h1>
    </div>
  );
}