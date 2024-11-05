<?php

/**
 * @file
 * Commerce Discount Entity.
 */

/**
 * Entity class representing the commerce_discount entity type.
 */
class CommerceDiscount extends Entity {

    /**
   * Implements EntityInterface::id().
   */
  public function id() {
    return $this->discount_id;
  }

  /**
   * Implements EntityInterface::entityType().
   */
  public function entityType() {
    return $this->type;
  }

  /**
   * Implements EntityInterface::label().
   */
  public function label() {
    return t('Discount @id', array('@id' => $this->discount_id));
  }

  /**
   * Implements EntityInterface::uri().
   */
  public function uri() {
    // return the admin page for the order.
    return $this->defaultUri();
  }

  /**
   * The machine name of the discount.
   *
   * @var string
   */
  public $name;

  /**
   * The label of the discount.
   *
   * @var string
   */
  public $label;

  /**
   * Set the default discount type (bundle).
   *
   * @var string
   */
  public $type = 'order_discount';

  /**
   * Whether the discount is active.
   *
   * @var bool
   */
  public $status = TRUE;

  /**
   * Set the component price title shown for customers.
   *
   * @var string
   */
  public $component_title;

  /**
   * {@inheritdoc}
   */
  public function __construct($values = array()) {
    parent::__construct($values, 'commerce_discount');
    $this->component_title = $this->getTranslation('component_title');
  }

  /**
   * {@inheritdoc}
   */
  protected function defaultUri() {
    $entity_info = entity_get_info('commerce_discount');
    $path = $entity_info['admin ui']['path'] . '/manage';
    return array('path' => $path . '/' . $this->name);
  }

  /**
   * Overridden, to introduce the method for old entity API versions (BC).
   *
   * @todo Remove once we bump the required entity API version.
   */
  public function getTranslation($property, $langcode = NULL) {
    if (module_exists('i18n_string')) {
      return parent::getTranslation($property, $langcode);
    }
    return $this->$property;
  }

}
