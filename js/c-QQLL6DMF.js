import*as s from"three";import{EffectComposer as m}from"three/addons/postprocessing/EffectComposer.js";import{RenderPass as p}from"three/addons/postprocessing/RenderPass.js";import{UnrealBloomPass as g}from"three/addons/postprocessing/UnrealBloomPass.js";import{OutputPass as d}from"three/addons/postprocessing/OutputPass.js";import{ShaderPass as f}from"three/addons/postprocessing/ShaderPass.js";import{RoomEnvironment as v}from"three/addons/environments/RoomEnvironment.js";var n={lift:[0,0,0],gamma:[1,1,1],gain:[1,1,1],saturation:1,contrast:1,temperature:0,tint:0,fade:0,shadowsTint:[.5,.5,.5],highlightsTint:[.5,.5,.5],splitBalance:0,splitAmount:0,keepHue:-1,keepWidth:.08,keepAmount:0,vignette:.35,vignetteSoftness:.55,grain:.035,ca:.0015,scratches:0,leak:0,leakColor:[1,.55,.25],crt:0,pixelate:0,exposure:1,bloom:{strength:.55,radius:.55,threshold:.82}},h={neutral:{},ussr89:{lift:[0,.02,.04],gain:[1.02,.98,.92],saturation:.82,contrast:1.08,temperature:-.05,shadowsTint:[.25,.5,.6],highlightsTint:[.75,.55,.3],splitAmount:.35,grain:.09,ca:.004,vignette:.55,bloom:{strength:.9,radius:.7,threshold:.7}},halfface:{lift:[.06,.05,.06],saturation:.7,contrast:.92,fade:.12,temperature:.03,highlightsTint:[.62,.55,.5],splitAmount:.2,grain:.04,vignette:.25,leak:.25,leakColor:[1,.92,.85]},fadedPurple:{lift:[.06,0,.08],gamma:[1,1.05,.95],gain:[1.05,.95,1.05],saturation:.9,contrast:.95,fade:.1,shadowsTint:[.55,.3,.65],highlightsTint:[.7,.55,.45],splitAmount:.45,grain:.06,vignette:.45},bw:{saturation:0,contrast:1.25,grain:.07,vignette:.5,keepHue:0,keepWidth:.05,keepAmount:0},selectiveRed:{saturation:1.15,contrast:1.12,keepHue:.03,keepWidth:.07,keepAmount:1,gain:[1.1,1.08,1.06],lift:[.04,.04,.04],grain:.05,vignette:.2,leak:.35,leakColor:[1,.4,.15],bloom:{strength:.8,radius:.8,threshold:.65}},zip:{saturation:1.15,contrast:1.1,shadowsTint:[.2,.55,.5],highlightsTint:[.75,.7,.3],splitAmount:.4,vignette:.6,vignetteSoftness:.45,grain:.03},warmFilm:{lift:[.07,.05,.02],gain:[1.12,1.05,.9],saturation:.85,contrast:.9,fade:.08,temperature:.12,highlightsTint:[.8,.6,.35],splitAmount:.3,grain:.05,leak:.6,leakColor:[1,.6,.35],vignette:.3,exposure:1.25,bloom:{strength:1,radius:.85,threshold:.6}},grunge:{lift:[.03,.02,0],gamma:[1,.98,1.1],gain:[1,.95,.75],saturation:.7,contrast:1.2,shadowsTint:[.35,.4,.25],highlightsTint:[.7,.55,.3],splitAmount:.4,grain:.12,scratches:.8,vignette:.75,ca:.003},vintageYellow:{lift:[.06,.05,0],gain:[1.05,1.02,.85],saturation:.85,contrast:.95,fade:.1,temperature:.08,highlightsTint:[.75,.7,.45],splitAmount:.3,grain:.05,vignette:.55,bloom:{strength:.9,radius:.6,threshold:.7}},goldenHour:{gain:[1.08,1,.88],saturation:1.05,contrast:1.02,temperature:.1,highlightsTint:[.8,.6,.35],shadowsTint:[.4,.45,.55],splitAmount:.3,leak:.35,leakColor:[1,.55,.2],grain:.03,vignette:.35,bloom:{strength:1,radius:.9,threshold:.62}},stage:{saturation:1,contrast:1.1,temperature:-.02,shadowsTint:[.4,.42,.55],splitAmount:.15,vignette:.45,grain:.025,bloom:{strength:.85,radius:.6,threshold:.72}},crt:{crt:1,saturation:1.1,contrast:1.05,vignette:.6,grain:.04,ca:.004,bloom:{strength:1.1,radius:.5,threshold:.5}},polygon:{saturation:1.1,contrast:1.05,shadowsTint:[.3,.3,.6],highlightsTint:[.7,.5,.65],splitAmount:.3,vignette:.5,grain:.02,bloom:{strength:1.2,radius:.6,threshold:.55}},roblox:{saturation:1.25,contrast:1.05,gain:[1.03,1.03,1],vignette:.2,grain:0,ca:0,bloom:{strength:.45,radius:.4,threshold:.9}},island:{saturation:1.15,contrast:1.05,temperature:.05,highlightsTint:[.75,.65,.45],shadowsTint:[.3,.5,.6],splitAmount:.25,vignette:.35,grain:.02},morrowind:{lift:[.02,.03,.02],gain:[.95,1,.92],saturation:.75,contrast:1.05,shadowsTint:[.35,.45,.4],highlightsTint:[.7,.65,.5],splitAmount:.35,fade:.06,vignette:.6,grain:.05},finale:{saturation:1.15,contrast:1.06,temperature:.03,vignette:.35,grain:.02,bloom:{strength:1.1,radius:.75,threshold:.6}}},T={uniforms:{tDiffuse:{value:null},uTime:{value:0},uRes:{value:new s.Vector2(1,1)},uLift:{value:new s.Vector3},uGamma:{value:new s.Vector3(1,1,1)},uGain:{value:new s.Vector3(1,1,1)},uSat:{value:1},uContrast:{value:1},uTemp:{value:0},uTint:{value:0},uFade:{value:0},uShadowsTint:{value:new s.Vector3(.5,.5,.5)},uHighTint:{value:new s.Vector3(.5,.5,.5)},uSplitBalance:{value:0},uSplitAmount:{value:0},uKeepHue:{value:-1},uKeepWidth:{value:.08},uKeepAmount:{value:0},uVignette:{value:.35},uVignetteSoft:{value:.55},uGrain:{value:.035},uCA:{value:.0015},uScratches:{value:0},uLeak:{value:0},uLeakColor:{value:new s.Vector3(1,.55,.25)},uCRT:{value:0},uPixelate:{value:0},uFlash:{value:0},uFlashColor:{value:new s.Color(1,1,1)}},vertexShader:`
    varying vec2 vUv;
    void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`
    uniform sampler2D tDiffuse; uniform float uTime; uniform vec2 uRes;
    uniform vec3 uLift, uGamma, uGain; uniform float uSat, uContrast, uTemp, uTint, uFade;
    uniform vec3 uShadowsTint, uHighTint; uniform float uSplitBalance, uSplitAmount;
    uniform float uKeepHue, uKeepWidth, uKeepAmount;
    uniform float uVignette, uVignetteSoft, uGrain, uCA, uScratches, uLeak; uniform vec3 uLeakColor;
    uniform float uCRT, uPixelate, uFlash; uniform vec3 uFlashColor;
    varying vec2 vUv;

    float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
    float noise(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);
      return mix(mix(hash(i), hash(i+vec2(1,0)), f.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y); }
    vec3 rgb2hsv(vec3 c){ vec4 K = vec4(0.0, -1.0/3.0, 2.0/3.0, -1.0);
      vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
      vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
      float d = q.x - min(q.w, q.y); float e = 1.0e-10;
      return vec3(abs(q.z + (q.w - q.y) / (6.0*d + e)), d / (q.x + e), q.x); }
    float luma(vec3 c){ return dot(c, vec3(0.2126, 0.7152, 0.0722)); }

    vec2 barrel(vec2 uv, float k){ vec2 c = uv - 0.5; float r2 = dot(c, c); return 0.5 + c * (1.0 + k * r2); }

    void main(){
      vec2 uv = vUv;
      if (uCRT > 0.0) uv = mix(uv, barrel(uv, 0.18), uCRT);
      if (uPixelate > 0.0) { vec2 px = uRes / mix(1.0, 6.0, uPixelate); uv = (floor(uv * px) + 0.5) / px; }
      vec2 dir = uv - 0.5;
      float caAmt = uCA * (1.0 + uCRT * 2.0);
      vec3 col;
      col.r = texture2D(tDiffuse, uv + dir * caAmt).r;
      col.g = texture2D(tDiffuse, uv).g;
      col.b = texture2D(tDiffuse, uv - dir * caAmt).b;

      // white balance
      col *= vec3(1.0 + uTemp * 0.6 + uTint * 0.1, 1.0 - uTint * 0.3, 1.0 - uTemp * 0.6 + uTint * 0.1);
      // lift / gamma / gain (ASC-CDL-ish)
      col = clamp(col * uGain + uLift * (1.0 - col), 0.0, 8.0);
      col = pow(max(col, 0.0), 1.0 / max(uGamma, vec3(0.01)));
      // split toning
      float L = luma(col);
      vec3 split = mix(uShadowsTint, uHighTint, smoothstep(0.0, 1.0, L + uSplitBalance * 0.5));
      col = mix(col, col * (split * 2.0), uSplitAmount * 0.5);
      // contrast around mid grey
      col = (col - 0.5) * uContrast + 0.5;
      // saturation + selective color keep
      L = luma(col);
      float sat = uSat;
      if (uKeepHue >= 0.0) {
        vec3 hsv = rgb2hsv(clamp(col, 0.0, 1.0));
        float dh = abs(hsv.x - uKeepHue); dh = min(dh, 1.0 - dh);
        float keep = (1.0 - smoothstep(uKeepWidth * 0.6, uKeepWidth, dh)) * smoothstep(0.12, 0.35, hsv.y);
        sat = mix(sat * (1.0 - uKeepAmount), sat, keep);
      }
      col = mix(vec3(L), col, sat);
      // fade (milky blacks)
      col = col * (1.0 - uFade) + uFade * (0.5 * col + 0.25);

      // light leak (animated warm blob from the edge)
      if (uLeak > 0.0) {
        vec2 lp = vec2(0.85 + 0.12 * sin(uTime * 0.21), 0.2 + 0.15 * sin(uTime * 0.13 + 1.0));
        float d = length((uv - lp) * vec2(uRes.x / uRes.y, 1.0));
        float leak = smoothstep(0.9, 0.0, d) * (0.6 + 0.4 * noise(vec2(uTime * 0.3, 0.0)));
        col += uLeakColor * leak * uLeak * 0.35;
        col = mix(col, 1.0 - (1.0 - col) * (1.0 - uLeakColor * leak * uLeak * 0.25), 0.5);
      }

      // film scratches + dust
      if (uScratches > 0.0) {
        float t = floor(uTime * 18.0);
        float sx = hash(vec2(t, 1.7));
        float line = smoothstep(0.0015, 0.0, abs(uv.x - sx)) * step(0.55, hash(vec2(t, 3.1)));
        float line2 = smoothstep(0.001, 0.0, abs(uv.x - fract(sx * 7.31))) * step(0.75, hash(vec2(t, 9.2)));
        float dust = step(0.9985, hash(floor(uv * uRes / 3.0) + t));
        float flicker = 1.0 + (hash(vec2(t, 5.0)) - 0.5) * 0.08;
        col = col * mix(1.0, flicker, uScratches) + (line * 0.25 + line2 * 0.18 - dust * 0.6) * uScratches;
      }

      // CRT scanlines + aperture mask
      if (uCRT > 0.0) {
        float scan = 0.5 + 0.5 * sin(uv.y * uRes.y * 3.14159);
        col *= mix(1.0, 0.72 + 0.28 * scan, uCRT);
        float m = mod(gl_FragCoord.x, 3.0);
        vec3 mask = vec3(m < 1.0 ? 1.0 : 0.8, (m >= 1.0 && m < 2.0) ? 1.0 : 0.8, m >= 2.0 ? 1.0 : 0.8);
        col *= mix(vec3(1.0), mask, uCRT * 0.6);
        col *= 1.0 + 0.03 * uCRT * sin(uTime * 120.0);
        vec2 b = barrel(vUv, 0.18 * uCRT);
        float edge = smoothstep(0.0, 0.01, b.x) * smoothstep(1.0, 0.99, b.x) * smoothstep(0.0, 0.01, b.y) * smoothstep(1.0, 0.99, b.y);
        col *= mix(1.0, edge, uCRT);
      }

      // vignette
      float vd = length(dir * vec2(uRes.x / uRes.y, 1.0) * 0.9);
      col *= 1.0 - uVignette * smoothstep(uVignetteSoft * 0.5, uVignetteSoft + 0.45, vd);

      // grain (luma-weighted, animated)
      float g = hash(uv * uRes * 0.5 + fract(uTime * 7.13) * 100.0) - 0.5;
      col += g * uGrain * (1.0 - 0.6 * luma(col));

      col = mix(col, uFlashColor, clamp(uFlash, 0.0, 1.0));
      gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
    }`};function x(u,e,t){return u.map((a,i)=>a+(e[i]-a)*t)}var k=u=>u*u*(3-2*u),c=class{constructor(e){let t=matchMedia("(pointer: coarse)").matches||Math.min(screen.width,screen.height)<600;this.isMobile=t,this.quality=t?"low":"high";let a=new s.WebGLRenderer({canvas:e,antialias:!1,powerPreference:"high-performance",stencil:!1});a.setPixelRatio(Math.min(devicePixelRatio,t?1.5:2)),a.toneMapping=s.ACESFilmicToneMapping,a.toneMappingExposure=1,a.outputColorSpace=s.SRGBColorSpace,a.shadowMap.enabled=!0,a.shadowMap.type=s.PCFShadowMap,this.renderer=a,this.maxAniso=a.capabilities.getMaxAnisotropy();let i=new s.PMREMGenerator(a);this.envMap=i.fromScene(new v,.04).texture,this.envMap.userData.shared=!0,this.pmrem=i,this.scene=new s.Scene,this.camera=new s.PerspectiveCamera(50,1,.05,500);let o=a.getDrawingBufferSize(new s.Vector2),r=new s.WebGLRenderTarget(o.x,o.y,{type:s.HalfFloatType,samples:t?2:4});this.composer=new m(a,r),this.renderPass=new p(this.scene,this.camera),this.bloomPass=new g(new s.Vector2(o.x,o.y),.55,.55,.82),this.outputPass=new d,this.gradePass=new f(T),this.composer.addPass(this.renderPass),this.composer.addPass(this.bloomPass),this.composer.addPass(this.outputPass),this.composer.addPass(this.gradePass),this.grade=structuredClone(n),this._gradeFrom=null,this._gradeTo=null,this._gradeT=0,this._gradeDur=0,this._flash=0,this._flashDur=.4,this._flashAmt=1,this._applyGrade(),this.resize()}setScene(e,t){this.scene=e,this.camera=t,this.renderPass.scene=e,this.renderPass.camera=t}resize(){let e=innerWidth,t=innerHeight;this.renderer.setSize(e,t,!1),this.composer.setPixelRatio(this.renderer.getPixelRatio()),this.composer.setSize(e,t);let a=this.renderer.getPixelRatio();this.gradePass.uniforms.uRes.value.set(e*a,t*a),this.camera.isPerspectiveCamera&&(this.camera.aspect=e/t,this.camera.updateProjectionMatrix())}setGrade(e,t=0){let a=structuredClone(n),i=typeof e=="string"?h[e]||{}:e||{};for(let o in i)a[o]=o==="bloom"?{...a.bloom,...i.bloom}:structuredClone(i[o]);if(t<=0){this.grade=a,this._gradeTo=null,this._applyGrade();return}this._gradeFrom=structuredClone(this.grade),this._gradeTo=a,this._gradeT=0,this._gradeDur=t}setParam(e,t){this.grade[e]=t,this._gradeTo&&(this._gradeTo[e]=t),this._applyGrade()}flash(e=16777215,t=.4,a=1){this.gradePass.uniforms.uFlashColor.value.set(e),this._flash=1,this._flashDur=t,this._flashAmt=a}_applyGrade(){let e=this.grade,t=this.gradePass.uniforms;t.uLift.value.fromArray(e.lift),t.uGamma.value.fromArray(e.gamma),t.uGain.value.fromArray(e.gain),t.uSat.value=e.saturation,t.uContrast.value=e.contrast,t.uTemp.value=e.temperature,t.uTint.value=e.tint,t.uFade.value=e.fade,t.uShadowsTint.value.fromArray(e.shadowsTint),t.uHighTint.value.fromArray(e.highlightsTint),t.uSplitBalance.value=e.splitBalance,t.uSplitAmount.value=e.splitAmount,t.uKeepHue.value=e.keepHue,t.uKeepWidth.value=e.keepWidth,t.uKeepAmount.value=e.keepAmount,t.uVignette.value=e.vignette,t.uVignetteSoft.value=e.vignetteSoftness,t.uGrain.value=e.grain,t.uCA.value=e.ca,t.uScratches.value=e.scratches,t.uLeak.value=e.leak,t.uLeakColor.value.fromArray(e.leakColor),t.uCRT.value=e.crt,t.uPixelate.value=e.pixelate,this.renderer.toneMappingExposure=e.exposure,this.bloomPass.strength=e.bloom.strength,this.bloomPass.radius=e.bloom.radius,this.bloomPass.threshold=e.bloom.threshold}_tickGrade(e){if(!this._gradeTo)return;this._gradeT=Math.min(1,this._gradeT+e/this._gradeDur);let t=k(this._gradeT),a=this._gradeFrom,i=this._gradeTo,o=this.grade;for(let r in i)if(r==="bloom")for(let l in i.bloom)o.bloom[l]=a.bloom[l]+(i.bloom[l]-a.bloom[l])*t;else Array.isArray(i[r])?o[r]=x(a[r],i[r],t):r==="keepHue"?o[r]=t<.5?a[r]:i[r]:o[r]=a[r]+(i[r]-a[r])*t;a.keepHue<0&&i.keepHue>=0&&(o.keepHue=i.keepHue,o.keepAmount=i.keepAmount*t),a.keepHue>=0&&i.keepHue<0&&(o.keepHue=t<1?a.keepHue:-1,o.keepAmount=a.keepAmount*(1-t)),this._applyGrade(),this._gradeT>=1&&(this._gradeTo=null)}render(e,t){this._tickGrade(e);let a=this.gradePass.uniforms;a.uTime.value=t,this._flash>0?(this._flash=Math.max(0,this._flash-e/this._flashDur),a.uFlash.value=this._flash*this._flash*this._flashAmt):a.uFlash.value=0,this.composer.render(e)}api(){return{grade:(e,t=0)=>this.setGrade(e,t),set:(e,t)=>this.setParam(e,t),bloom:e=>{Object.assign(this.grade.bloom,e),this._applyGrade()},exposure:(e,t=0)=>{t<=0?this.setParam("exposure",e):this.setGrade({...this.grade,exposure:e},t)},flash:(e,t,a)=>this.flash(e,t,a),presets:Object.keys(h)}}};export{h as a,c as b};
