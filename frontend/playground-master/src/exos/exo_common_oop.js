(function () {
  class ExoCommonPage {
    static _safeUser() {
      try {
        return JSON.parse(localStorage.getItem('currentUser') || 'null');
      } catch (error) {
        return null;
      }
    }

    static initProfileWidget(options = {}) {
      const {
        containerId = 'widget-profil-header',
        registerHref = 'Page-demo/register.html',
        historyHref = 'Page-demo/historique.html',
        statsHref = 'statsetudiant.html',
        showStats = true,
        notConnectedLabel = 'You are not connected!',
        historyLabel = 'Mon Historique',
        statsLabel = 'Mes Statistiques',
        logoutLabel = 'Logout',
        profilePrefix = 'Profil'
      } = options;

      const container = document.getElementById(containerId);
      if (!container) return;

      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const user = ExoCommonPage._safeUser();

      container.style.cssText = 'position: relative; font-family: "Inter", sans-serif; perspective: 1000px; display: flex; align-items: center;';

      if (!isLoggedIn || !user) {
        const visitorBtn = document.createElement('a');
        visitorBtn.href = registerHref;
        visitorBtn.style.cssText = 'display:flex; align-items:center; gap:10px; background:rgba(255,255,255,0.05); padding:6px 20px 6px 6px; border-radius:50px; color:#fff; text-decoration:none; backdrop-filter:blur(20px); border:1px solid rgba(139,92,246,0.3); font-size:14px; box-shadow: 0 0 15px rgba(139,92,246,0.2); transition: 0.3s;';
        visitorBtn.innerHTML = `<div style="background:linear-gradient(135deg, #8b5cf6, #3b82f6); width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 0 10px rgba(139,92,246,0.5);">👤</div> <span style="font-weight:600; letter-spacing:0.5px;">${notConnectedLabel}</span>`;
        container.appendChild(visitorBtn);
        return;
      }

      const initials = ((user.prenom ? user.prenom[0] : '') + (user.nom ? user.nom[0] : '')).toUpperCase();
      const avatar = document.createElement('div');
      avatar.style.cssText = 'width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, #10b981, #3b82f6); display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 800; color: white; cursor: pointer; border: 2px solid rgba(255,255,255,0.2); box-shadow: 0 0 20px rgba(16, 185, 129, 0.4), inset 0 0 10px rgba(255,255,255,0.3); transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);';
      avatar.innerText = initials || 'U';
      avatar.onmouseover = function () { avatar.style.transform = 'scale(1.1) rotate(5deg)'; };
      avatar.onmouseout = function () { avatar.style.transform = 'scale(1) rotate(0deg)'; };

      const menu = document.createElement('div');
      menu.style.cssText = 'display: none; position: absolute; top: 60px; right: 0; width: 260px; background: rgba(15, 23, 42, 0.9); backdrop-filter: blur(25px); border: 1px solid rgba(148, 163, 184, 0.15); border-radius: 20px; box-shadow: 0 25px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05) inset; overflow: hidden; transform-origin: top right; transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); opacity: 0; transform: scale(0.9) translateY(-10px); pointer-events: none; z-index: 1001;';

      const p = user.profil || user.profile || user.role || 'étudiant';
      const typeProfil = p.charAt(0).toUpperCase() + p.slice(1);
      const statsLink = showStats ? `<a href="${statsHref}" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; color: #e2e8f0; text-decoration: none; font-size: 13px; font-weight: 600; transition: all 0.2s; cursor: pointer;" onmouseover="this.style.background='rgba(59, 130, 246, 0.1)'; this.style.color='#60a5fa'; this.style.transform='translateX(5px)';" onmouseout="this.style.background='transparent'; this.style.color='#e2e8f0'; this.style.transform='translateX(0)';"><span style="font-size: 16px;">📈</span> ${statsLabel}</a>` : '';

      menu.innerHTML = `
        <div style="padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.05); background: linear-gradient(to bottom, rgba(255,255,255,0.02), transparent);">
          <div style="font-size: 17px; font-weight: 800; color: #fff; letter-spacing: -0.5px;">${user.prenom || ''} ${user.nom || ''}</div>
          <div style="font-size: 12px; color: #94a3b8; margin-top: 4px;">${user.email || ''}</div>
          <div style="display: inline-block; margin-top: 12px; padding: 4px 10px; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 30px; font-size: 10px; font-weight: 700; color: #10b981; text-transform: uppercase; letter-spacing: 1px;">🟢 ${profilePrefix} ${typeProfil}</div>
        </div>
        <div style="padding: 8px;">
          <a href="${historyHref}" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; color: #e2e8f0; text-decoration: none; font-size: 13px; font-weight: 600; transition: all 0.2s; cursor: pointer;" onmouseover="this.style.background='rgba(59, 130, 246, 0.1)'; this.style.color='#60a5fa'; this.style.transform='translateX(5px)';" onmouseout="this.style.background='transparent'; this.style.color='#e2e8f0'; this.style.transform='translateX(0)';"><span style="font-size: 16px;">📊</span> ${historyLabel}</a>
          ${statsLink}
          <div id="btnFuturLogout" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; color: #f87171; font-size: 13px; font-weight: 600; transition: all 0.2s; cursor: pointer; margin-top: 2px;" onmouseover="this.style.background='rgba(239, 68, 68, 0.1)'; this.style.transform='translateX(5px)';" onmouseout="this.style.background='transparent'; this.style.transform='translateX(0)';"><span style="font-size: 16px;">🚪</span> ${logoutLabel}</div>
        </div>
      `;

      let isOpen = false;
      avatar.onclick = function () {
        isOpen = !isOpen;
        if (isOpen) {
          menu.style.display = 'block';
          setTimeout(function () {
            menu.style.opacity = '1';
            menu.style.transform = 'scale(1) translateY(0)';
            menu.style.pointerEvents = 'auto';
          }, 10);
        } else {
          menu.style.opacity = '0';
          menu.style.transform = 'scale(0.9) translateY(-10px)';
          menu.style.pointerEvents = 'none';
          setTimeout(function () { menu.style.display = 'none'; }, 300);
        }
      };

      const logoutBtn = menu.querySelector('#btnFuturLogout');
      if (logoutBtn) {
        logoutBtn.onclick = function () {
          localStorage.removeItem('isLoggedIn');
          window.location.href = 'index.html';
        };
      }

      document.addEventListener('click', function (event) {
        if (!container.contains(event.target) && isOpen) {
          avatar.onclick();
        }
      });

      container.appendChild(avatar);
      container.appendChild(menu);
    }

    static initBackgroundAnimation(options = {}) {
      const {
        containerId = 'background-container',
        formulas = ['\\sqrt{x}', '\\int_{a}^{b} f(x) dx', 'f(x) = ax^2 + bx + c', '\\frac{dy}{dx}', '\\alpha', '\\beta', '\\gamma', '\\sin(t)', '\\cos(t)', 'e^{-t}'],
        numFormulas = 25,
        numNeurons = 30,
        numConnections = 50
      } = options;

      const backgroundContainer = document.getElementById(containerId);
      if (!backgroundContainer) return;

      const neurons = [];
      const connections = [];

      const getRandom = (min, max) => Math.random() * (max - min) + min;
      const lerp = (start, end, amount) => (1 - amount) * start + amount * end;

      function createAnimatedElement(type, elementClass) {
        const element = document.createElement('div');
        element.className = elementClass;
        element.style.position = 'absolute';

        if (type === 'formula') {
          element.textContent = formulas[Math.floor(Math.random() * formulas.length)];
          element.style.fontSize = 'clamp(1rem, 5vw, 2.5rem)';
          element.style.opacity = String(getRandom(0.04, 0.12));
          element.style.color = `rgba(255, 255, 255, ${element.style.opacity})`;
          element.style.left = `${getRandom(-20, 120)}vw`;
          element.style.top = `${getRandom(-20, 120)}vh`;
          element.style.transform = `rotate(${getRandom(-30, 30)}deg)`;
        } else if (type === 'neuron') {
          const size = getRandom(10, 25);
          element.style.width = `${size}px`;
          element.style.height = `${size}px`;
          element.style.backgroundColor = `hsl(${getRandom(190, 250)}, 70%, 50%)`;
          element.style.boxShadow = `0 0 15px rgba(139, 92, 246, 0.5), 0 0 25px ${element.style.backgroundColor}`;
          element.style.left = `${getRandom(-10, 110)}vw`;
          element.style.top = `${getRandom(-10, 110)}vh`;
          element.style.opacity = '0';
          element.style.transform = 'scale(0)';
          neurons.push({ element, size, x: 0, y: 0, opacity: 0, scale: 0 });
        }

        backgroundContainer.appendChild(element);
      }

      function createConnection(neuron1, neuron2) {
        const connection = document.createElement('div');
        connection.className = 'connection';
        connection.style.position = 'absolute';
        connection.style.height = '1.5px';
        connection.style.background = 'linear-gradient(to right, rgba(139, 92, 246, 0.15), rgba(99, 102, 241, 0.2))';
        connection.style.opacity = '0';
        connection.style.transformOrigin = '0 0';
        connection.style.filter = 'blur(4px)';
        connections.push({ element: connection, neuron1, neuron2, opacity: 0 });
        backgroundContainer.appendChild(connection);
      }

      for (let i = 0; i < numFormulas; i++) createAnimatedElement('formula', 'math-formula');
      for (let i = 0; i < numNeurons; i++) createAnimatedElement('neuron', 'neuron');
      for (let i = 0; i < numConnections; i++) {
        const n1 = neurons[Math.floor(Math.random() * neurons.length)];
        const n2 = neurons[Math.floor(Math.random() * neurons.length)];
        if (n1 !== n2) createConnection(n1, n2);
      }

      function animateBackground() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const time = Date.now() * 0.0005;

        neurons.forEach((neuron, index) => {
          const angle = index * (2 * Math.PI / numNeurons) + time;
          const radius = Math.min(windowWidth, windowHeight) * 0.3;
          const targetX = windowWidth / 2 + radius * Math.cos(angle) + Math.sin(time * 0.5 + index * 0.1) * 50;
          const targetY = windowHeight / 2 + radius * Math.sin(angle) + Math.cos(time * 0.5 + index * 0.1) * 50;

          neuron.element.style.opacity = String(neuron.opacity = Math.max(neuron.opacity, 0.15));
          neuron.element.style.transform = `scale(${neuron.scale = Math.max(neuron.scale, 1)})`;
          neuron.element.style.left = `${neuron.x = lerp(neuron.x, targetX - neuron.size / 2, 0.05)}px`;
          neuron.element.style.top = `${neuron.y = lerp(neuron.y, targetY - neuron.size / 2, 0.05)}px`;
        });

        connections.forEach((conn) => {
          const { element, neuron1, neuron2 } = conn;
          const x1 = neuron1.x + neuron1.size / 2;
          const y1 = neuron1.y + neuron1.size / 2;
          const x2 = neuron2.x + neuron2.size / 2;
          const y2 = neuron2.y + neuron2.size / 2;
          const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
          const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

          element.style.opacity = '0.3';
          element.style.width = `${length}px`;
          element.style.left = `${x1}px`;
          element.style.top = `${y1}px`;
          element.style.transform = `rotate(${angle}deg)`;
        });

        requestAnimationFrame(animateBackground);
      }

      animateBackground();
    }

    static saveToStorage(key, exoData) {
      const user = ExoCommonPage._safeUser();
      if (!user || !user.email) return false;

      const userKey = `${key}_${user.email}`;
      const list = JSON.parse(localStorage.getItem(userKey) || '[]');
      if (!list.find((e) => e.id === exoData.id)) {
        list.push(exoData);
        localStorage.setItem(userKey, JSON.stringify(list));
        return true;
      }
      return false;
    }
  }

  window.ExoCommonPage = ExoCommonPage;
})();
