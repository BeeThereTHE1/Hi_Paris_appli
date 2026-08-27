'use strict';

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.resolve(__dirname, '../data');
const EXERCISE_FILE_PATTERN = /^exo(\d+)\.json$/;
const ALLOWED_STATUS = new Set(['IN_PROGRESS', 'COMPLETED', 'FAILED']);

class Exercise {
  constructor(raw = {}) {
    this.id = Number(raw.id);
    this.title = raw.title || '';
    this.description = raw.description || '';
    this.steps = Array.isArray(raw.steps)
      ? raw.steps.map((step, index) => ({
          id: Number.isInteger(step.id) ? step.id : index,
          title: step.title || `Step ${index}`,
          text: step.text || '',
        }))
      : [];
    this.config = raw.config && typeof raw.config === 'object' ? raw.config : {};
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      steps: this.steps,
      config: this.config,
    };
  }

  markStepCompleted(currentProgress = {}, stepId) {
    const completed = Array.isArray(currentProgress.completed_steps)
      ? [...currentProgress.completed_steps]
      : [];

    if (!completed.includes(stepId)) {
      completed.push(stepId);
    }

    return {
      ...currentProgress,
      current_step: stepId,
      completed_steps: completed,
      status: completed.length >= this.steps.length ? 'COMPLETED' : 'IN_PROGRESS',
    };
  }

  static getExerciseFilePath(exerciseId) {
    return path.join(DATA_DIR, `exo${exerciseId}.json`);
  }

  static loadExerciseById(exerciseId) {
    const filePath = Exercise.getExerciseFilePath(exerciseId);
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const rawText = fs.readFileSync(filePath, 'utf8');
    const parsed = JSON.parse(rawText);
    return new Exercise(parsed);
  }

  static getAllExercises({ limit = 50, offset = 0 } = {}) {
    const exerciseFiles = fs
      .readdirSync(DATA_DIR)
      .filter((name) => EXERCISE_FILE_PATTERN.test(name))
      .sort((a, b) => {
        const aId = Number((a.match(EXERCISE_FILE_PATTERN) || [])[1]);
        const bId = Number((b.match(EXERCISE_FILE_PATTERN) || [])[1]);
        return aId - bId;
      });

    const total = exerciseFiles.length;

    const items = exerciseFiles
      .slice(offset, offset + limit)
      .map((fileName) => {
        const rawText = fs.readFileSync(path.join(DATA_DIR, fileName), 'utf8');
        const parsed = JSON.parse(rawText);
        const exercise = new Exercise(parsed);

        return {
          id: exercise.id,
          title: exercise.title,
          description: exercise.description,
          step_count: exercise.steps.length,
          config: exercise.config,
        };
      });

    return { items, total };
  }

  static validateProgressData(progressData = {}) {
    const errors = [];

    if (!progressData || typeof progressData !== 'object') {
      return {
        isValid: false,
        errors: ['Progress payload must be an object.'],
        value: null,
      };
    }

    const status = progressData.status || 'IN_PROGRESS';
    if (!ALLOWED_STATUS.has(status)) {
      errors.push(`status must be one of: ${Array.from(ALLOWED_STATUS).join(', ')}`);
    }

    const hasCurrentStep = progressData.current_step !== undefined && progressData.current_step !== null;
    if (hasCurrentStep && !Number.isInteger(progressData.current_step)) {
      errors.push('current_step must be an integer when provided.');
    }

    if (progressData.score_details !== undefined && progressData.score_details !== null) {
      const detailsType = typeof progressData.score_details;
      if (detailsType !== 'object' || Array.isArray(progressData.score_details)) {
        errors.push('score_details must be a JSON object when provided.');
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      value: {
        status,
        current_step: hasCurrentStep ? progressData.current_step : 0,
        score_details: progressData.score_details || {},
      },
    };
  }
}

module.exports = {
  Exercise,
  ALLOWED_STATUS,
};
