<?php

/**
 * @file
 * Commerce Discount Offer Entity.
 */

/**
 * Entity class representing the commerce_discount_offer entity type.
 */
class CommerceDiscountOffer extends Entity {

    /**
   * Implements EntityInterface::id().
   */
  public function id() {
    return $this->discount_offer_id;
  }

  /**
   * Implements EntityInterface::entityType().
   */
  public function entityType() {
    return 'commerce_discount_offer';
  }

  /**
   * Implements EntityInterface::label().
   */
  public function label() {
    return t('Discount offer @id', array('@id' => $this->discount_offer_id));
  }

  /**
   * Implements EntityInterface::uri().
   */
  public function uri() {
    // return the admin page for the order.
    return array(
      'path' => '/admin/commerce/discount_offer/' . $this->discount_offer_id,
      'options' => array(),
    );
  }

  /**
   * The discount offer type (bundle).
   *
   * @var string
   */
  public $type;

  /**
   * {@inheritdoc}
   */
  public function __construct($values = array()) {
    parent::__construct($values, 'commerce_discount_offer');
  }

}
