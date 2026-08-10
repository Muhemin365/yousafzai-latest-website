import React from 'react';
import StoryEngine from '../story/StoryEngine';
import SceneAboutHero from '../components/scenes/SceneAboutHero';
import SceneChairman from '../components/scenes/SceneChairman';
import SceneOurStory from '../components/scenes/SceneOurStory';
import SceneVisionMission from '../components/scenes/SceneVisionMission';
import SceneCertificates from '../components/scenes/SceneCertificates';

export default function AboutPage() {
  return (
    <StoryEngine>
      {/* SCENE 1: About Hero */}
      <SceneAboutHero />

      {/* SCENE 2: Chairman's Message */}
      <SceneChairman />

      {/* SCENE 3: Our Story */}
      <SceneOurStory />

      {/* SCENE 4: Vision & Mission */}
      <SceneVisionMission />

      {/* SCENE 5: Certificates & Accreditations */}
      <SceneCertificates />
    </StoryEngine>
  );
}
